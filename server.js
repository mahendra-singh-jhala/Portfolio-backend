const express = require("express")
const cors = require("cors")
const bodyParse = require("body-parser")
const nodemailer = require("./nodemailer/nodemailer")


const app = express();
PORT = 5000

// middlewares
app.use(bodyParse.json())
app.use(cors())

app.post("/receive-email", async (req, res) => {
    const { firstname, lastname, email, message } = req.body

    const name = firstname + " " + lastname;
    try {
        await nodemailer(email, `Message From ${name}`, `You have received a new message from ${name} (${email}):\n\n${message}`);

        res.status(200).send({ 
            success: true, 
            message: "Thank you for reaching out! Your message has been sent" 
        });

    } catch (error) {
        res.status(500).send({ 
            success: false, 
            message: "Failed to send email" 
        });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})