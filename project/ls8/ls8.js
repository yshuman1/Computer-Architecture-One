const RAM = require("./ram");
const CPU = require("./cpu");
const fs = require("fs");

function loadMemory(cpu, filename) {
  const content = fs.readFileSync(filename, "utf-8");
  const lines = content.trim().split(/[\r\n]+/g);

  program = [];

  for (let line of lines) {
    const val = parseInt(line, 2);
    if (isNaN(val)) {
      continue;
    }
    program.push(val);
  }

  for (let i = 0; i < program.length; i++) {
    cpu.poke(i, program[i]);
  }
}

if (process.argv.length != 3) {
  console.error("usage: ls8 filename");
  process.exit(1);
}
let ram = new RAM(256);
let cpu = new CPU(ram);

loadMemory(cpu, process.argv[2]);
cpu.startClock();
