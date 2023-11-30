const AdventOfCodeSolverProcessor = require( '../../src/AdventOfCodeSolverProcessor');

class AdventOfCodeSolver extends AdventOfCodeSolverProcessor {
    constructor() {
        super(__dirname + '/input.txt');
    }

    /**
     * Let's solve the problem !
     * @example
     * // Execute method on each inputContent line value using its index too
     * this.inputContent.split(/\r?\n/).forEach((line, index) => {
     *   method(index, line);
     * });
     */
    solveProblem() {
        /** ... */

        this.getMemoryUsage();
    }
}

const solver = new AdventOfCodeSolver();
solver.solveProblem();