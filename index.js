// To validate objects
const Joi = require('joi');             // return class

const express = require('express');     // return a function
const app = express();                  // return an object

const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json());

// get create forms 
app.get ( '/web/courses/create' , function ( req , res ){ 
    res . sendFile ( __dirname + '/course.html' ); });

 app . get ( '/web/students/create' , function ( req , res ){ 
     res . sendFile ( __dirname + '/student.html' ); });


const courses = [
    { id: 1, name: 'course1', code: 'CSE111', description: 'database course' },
    { id: 2, name: 'course2', code: 'CSE123', description: 'Networks course' },
    { id: 3, name: 'course3', code: 'CSE156', description: 'compilers course' }
];

// To respond to http get request
app.get('/'/* path or url '/' represrnts route of the website*/, /* callback function */(req, res) => {
    // This req object has a bunch of useful propereties u can refrence documentation for more info
    res.send('Hello World');
});

// to get all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// to get single course
// api/courses/1 to get course of id 1
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }
    res.send(course);
});

// // we can have multiple parameters
// // http://localhost:3000/api/posts/2021/5
// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);  
// });


// Add course
app.post('/api/courses', (req, res) => {
    // validate request
    const schema = {
        name: Joi.string().min(5).required(),
        code: Joi.string().min(3).required(),
        description: Joi.string().max(200).optional()
       }

    const result = Joi.validate(req.body, schema);
    // // //console.log(result);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // create a new course object
    const course = {
        id: courses.length + 1,
        name: req.body.name ,// assuming that request body there's a name property
        code: req.body.code,
        description: req.body.description
    };
    courses.push(course);
    res.send(course);
});


// Updating resources
app.put('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }

    // validate 
    // If not valid, return 400 bad request
    const { error } = validateCourse(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update the course 
    // Return the updated course
    course.name = req.body.name;
    course.code = req.body.code;
    course.description = req.body.description;
    res.send(course);
});


// Deleting a course
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});

// Environment variable
const host = '0.0.0.0';
const port = process.env.PORT || 3000

app.listen(port /*PortNumber*/,host, () => console.log(`Listeneing on port ${port}......`) /* optionally a function that called when the app starts listening to the given port */);



function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required(),
        code: Joi.string().min(3).required(),
        description: Joi.string().max(200).optional()
    }
    return Joi.validate(course, schema);
}






const students = [
    { id: 1, name: 'Esraa', code: '1500421' },
    { id: 2, name: 'Aya',   code: '1500452'},
    { id: 3, name: 'Menna', code: '1600251'}
];

// to get all students
app.get('/api/students', (req, res) => {
    res.send(students);
});

// to get single student
app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('The student with the given id was not found.');
        return;
    }
    res.send(student);
});



// Add student
app.post('/api/students', (req, res) => {
    // validate request
    const schema = {
        name: Joi.string().min(5).required(),
        code: Joi.string().min(7).required(),
       }

    const result = Joi.validate(req.body, schema);
    //console.log(result);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // create a new student object
    const student = {
        id: students.length + 1,
        name: req.body.name ,// assuming that request body there's a name property
        code: req.body.code,
    };
    students.push(student);
    res.send(student);
});


// Updating students
app.put('/api/students/:id', (req, res) => {
    // Look up the student 
    // If not existing, return 404
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('The student with the given id was not found.');
        return;
    }

    // validate 
    // If not valid, return 400 bad request
    const { error } = validatestudent(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update the student 
    // Return the updated student
    student.name = req.body.name;
    student.code = req.body.code;
    student.description = req.body.description;
    res.send(student);
});


// Deleting a student
app.delete('/api/students/:id', (req, res) => {
    // Look up the student 
    // If not existing, return 404
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('The student with the given id was not found.');
        return;
    }

    // Delete
    const index = students.indexOf(student);
    students.splice(index, 1);

    // Return the same course
    res.send(student);
});


function validatestudent(student) {
    const schema = {
        name: Joi.string().min(3).required(),
        code: Joi.string().min(3).required(),
        }
    return Joi.validate(student, schema);
}


