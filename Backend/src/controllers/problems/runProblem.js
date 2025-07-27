const judge0 = require("../../judge0/judge0");

const runProblem = async (req, res) => {

    try {

        // extracting required fields from and req.body
        const { userSolution, language } = req.body;
        const { problem } = req;

        // checking if every required field is given
        if(!userSolution || !language)
            return res.status(400).send("Missing required fields");  

        console.log("hello")

        // checking user solution, if user solution is satisfying the visible test cases or not
        const runTestResult = await judge0.runUserSolution(userSolution, language, problem.visibleTestCases);

        console.log("bye")

        res.status(200).json(runTestResult);

    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).send({error: error.message});
    } 
}

module.exports = runProblem;