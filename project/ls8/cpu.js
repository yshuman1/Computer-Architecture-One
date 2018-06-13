const LDI = 0b10011001;
const PRN = 0b01000011;
const HLT = 0b00000001;
const MUL = 0b10101010;

class CPU {
  constructor(ram) {
    this.ram = ram;

    this.reg = new Array(8).fill(0); // General-purpose registers R0-R7

    this.PC = 0; // Program Counter
  }

  poke(address, value) {
    this.ram.write(address, value);
  }

  startClock() {
    this.clock = setInterval(() => {
      this.tick();
    }, 1); // 1 ms delay == 1 KHz clock == 0.000001 GHz
  }

  stopClock() {
    clearInterval(this.clock);
  }

  HLT() {
    this.stopClock();
  }

  alu(op, regA, regB) {
    switch (op) {
      case "MUL":
        this.reg[regA] = this.reg[regA] * this.reg[regB];
        break;
      case "ADD":
        this.reg[regA] = this.reg[regA] + this.reg[regB];
        break;
      case "SUB":
        this.reg[regA] = this.reg[regA] - this.reg[regB];
        break;
      case "DIV":
        if (this.reg[regB] === 0) {
          this.HLT();
        } else {
          this.reg[regA] = this.reg[regA] / this.reg[regB];
        }
        break;
      case "INC":
        this.reg[regA]++;
        break;
      case "DEC":
        this.reg[regA]--;
        break;
      // case "CMP":
      //   if (this.reg[regA] == this.reg[regB]) {
      //     /*0b00000001*/
      //   } else if (this.reg[regA] > this.reg[regB]) {
      //     /*0b00000010*/
      //   } else if (this.reg[regA] < this.reg[regB]) {
      //     /*0b0000100*/
      //   }
      //   break;
      default:
        console.log("halting");
        this.HLT();
    }
  }

  tick() {
    let IR = this.ram.read(this.PC);
    let operandA = this.ram.read(this.pc + 1);
    let operandB = this.ram.read(this.pc + 2);

    switch (IR) {
      case LDI:
        this.reg[operandA] = operandB;
        break;
      case PRN:
        console.log(this.reg[operandA]);
        break;
      case HLT:
        this.HLT();
        break;
      case MUL:
        this.alu("MUL", operandA, operandB);
        break;
      default:
        console.log("Unknown instruction: " + IR.toString(2));
        this.HLT();
        return;
    }

    const operandCount = (IR >> 6) + 1;
    this.PC += operandCount;
  }
}

module.exports = CPU;
