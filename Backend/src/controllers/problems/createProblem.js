const validateDetails = require("../../utils/validateDetails");
const judge0 = require("../../judge0/judge0");
const Problem = require("../../models/problems");

const createProblem = async (req, res) => {

    try {
        
        // adding problem creator _id in req.body object
        req.body.problemCreator = req.user._id;

        // validating problem details, if all the required fields are given or not
        await validateDetails.problem(req.body);

        // checking given refernce solution, if reference solution is itself satisfying the given test cases or not
        await judge0.validateProblem(req.body.referenceSolution, req.body.visibleTestCases);

        await judge0.validateProblem(req.body.referenceSolution, req.body.hiddenTestCases);

        // creating new document in the collection 'problems'
        const createdProblem = await Problem.create(req.body);

        res.status(201).json(createdProblem);

    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({"error": error.message});
    } 
}

module.exports = createProblem;