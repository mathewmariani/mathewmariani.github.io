---
layout: post
title: "ASM Simulator in JavaScript"
description: "Understanding how the MARIE Simulator works."
date: 2018-08-26
tag: JavaScript
---

## Instruction Format

```javascript
// [0000]   [0000 0000 0000]
// [opcode] [operands]

var opcode  = ((this.ir >> 12) & 0xF);
var operand = (this.ir & 0xFFF);
```

Instructions are 16 bits in size; 4 bits for the opcode, 12 bits for the address.
An instruction is encoded with both the opcode and its operands.

To decode an instruction the bitwise operators, [SHIFT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Right_shift) and [AND](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_AND), are used to obtain both the opcode and operand.


## The CPU

```javascript
this.ac = 0x0;
this.ir = 0x0;
this.mbr = 0x0;
this.pc = 0x0;
this.mar = 0x0;
this.in = 0x0;
this.out = 0x0;
```

The CPU contains 7 Registers, the [Accumulator](https://en.wikipedia.org/wiki/Accumulator_(computing)) being the only [general purpose](https://en.wikipedia.org/wiki/Processor_register#GPR]) register.

- `AC` a 16-bit register which holds the results of an arithmetical or logical operation.
- `IR` a 16-bit register which holds an instruction immediately preceding its execution.
- `MBR` a 16-bit register that holds the data after its retrieval from, or before its placement into memory.
- `PC` Program Control, a 12-bit register that holds the address of the next program instruction to be executed.
- `MAR` a 12-bit register that holds a memory address of an instruction (the operand of an instruction).
- `IN` an 8-bit register that holds data read from an input device.
- `OUT` an 8-bit register that holds data that is ready for the output device.

```javascript
// cpu fetch
service.fetch = function() {
  this.mar = ((this.pc >>> 0) & 0xFFF);
  this.ir = ((memory.read(this.pc) >>> 0) & 0xFFFF);
  this.pc = (((this.pc + 1) >>> 0) & 0xFFF);
}

// cpu execute
service.execute = function() {
  var opcode  = ((this.ir >> 12) & 0xF);
  var operand = (this.ir & 0xFFF);
}
```

On each CPU cycle the Instruction Pointer ([MAR](https://en.wikipedia.org/wiki/Program_counter)) is updated using the Program Counter ([PC](https://en.wikipedia.org/wiki/Program_counter)). An instruction is then fetched from the Instruction Register ([IR](https://en.wikipedia.org/wiki/Instruction_register)) where the opcode and operand are decoded from the instruction, and executed by the CPU.


## The Memory

```javascript
service.data = Array(4096);

// memory read
service.read = function (address) {
  if (address < 0 || address >= this.data.length) {
    throw "Memory access violation. Address: " + address;
  }
  return this.data[address];
}

// memory write
service.write = function (address, value) {
  if (address < 0 || address >= this.data.length) {
    throw "Memory access violation. Address: " + address;
  }
  var ref = (value & 0xFFFF);
  this.data[address] = (ref > 0x7FFF) ? ref - 0x10000 : ref;
}
```

A simple array is used to represent the machines memory; A size of 4096 is used since operands are only 12 bytes in size.

The memory service contains two functions.
`read` retrieves a byte from the given address while
`write` stores a given byte value at the specified address.

Both functions will throw an error if the given address isn't within the bounds of the address space (0x0, 0x1000).