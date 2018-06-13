/**
 * LS-8 v2.0 emulator skeleton code
 */
const LDI = 0b10011001;
const PRN = 0b01000011;
const HLT = 0b00000001;
/**
 * Class for simulating a simple Computer (CPU & memory)
 */
class CPU {
  /**
   * Initialize the CPU
   */
  constructor(ram) {
    this.ram = ram;

    this.reg = new Array(8).fill(0); // General-purpose registers R0-R7

    // Special-purpose registers
    this.PC = 0; // Program Counter
  }

  /**
   * Store value in memory address, useful for program loading
   */
  poke(address, value) {
    this.ram.write(address, value);
  }

  /**
   * Starts the clock ticking on the CPU
   */
  startClock() {
    this.clock = setInterval(() => {
      this.tick();
    }, 1); // 1 ms delay == 1 KHz clock == 0.000001 GHz
  }

  /**
   * Stops the clock
   */
  stopClock() {
    clearInterval(this.clock);
  }

  HLT() {
    this.stopClock();
  }
  /**
	 * ALU functionality
	 *
	 * The ALU is responsible for math and comparisons.
	 *
	 * If you have an instruction that does math, i.e. MUL, the CPU would hand
	 * it off to it's internal ALU component to do the actual work.
	 *
	//  * op can be: ADD SUB MUL DIV INC DEC CMP
	//  */
  // alu(op, regA, regB) {
  // 	switch (op) {
  // 		case 'MUL':
  // 			this.reg[regA] = this.reg[regA] * this.reg[regB];
  // 			break;

  // 		default:
  // 			console.log('halting');
  // 			this.HLT();
  // 	}
  // }

  /**
   * Advances the CPU one cycle
   */
  tick() {
    // Load the instruction register (IR--can just be a local variable here)
    // from the memory address pointed to by the PC. (I.e. the PC holds the
    // index into memory of the instruction that's about to be executed
    // right now.)
    const IR = this.ram.read(this.PC); //maybe???
    // !!! IMPLEMENT ME

    // Debugging output
    // console.log(`${this.PC}: ${IR.toString(2)}`);

    // Get the two bytes in memory _after_ the PC in case the instruction
    // needs them.

    // !!! IMPLEMENT ME
    let operandA = this.ram.read(this.PC + 1);
    let operandB = this.ram.read(this.PC + 2);
    // Execute the instruction. Perform the actions for the instruction as
    // outlined in the LS-8 spec.

    // !!! IMPLEMENT ME
    switch (IR) {
      case LDI:
        // set the value in a register
        this.reg[operandA] = operandB;
        // this.PC += 3; //next instruction
        break;

      case PRN:
        console.log(this.reg[operandA]);
        // this.PC += 2;
        break;

      case HLT:
        this.HLT();
        // this.PC += 1;
        break;

      default:
        console.log("Unknown instruction:" + IR.toString(2));
        this.HLT();
        return;
    }

    // Increment the PC register to go to the next instruction. Instructions
    // can be 1, 2, or 3 bytes long. Hint: the high 2 bits of the
    // instruction byte tells you how many bytes follow the instruction byte
    // for any particular instruction.

    // !!! IMPLEMENT ME
    this.PC += ((IR & 0b11000000) >> 6) + 1;
    // console.log(`new PC: ${this.PC}`);
  }
}

module.exports = CPU;
