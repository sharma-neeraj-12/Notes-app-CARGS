const fs = require('fs')
const chalk = require('chalk')


//@To add notes
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
// To check title duplicacy
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes) // to add to notes.json
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}
//********************************************************************** */
// To delete  a note
const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title) // array without deleted notes

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}
//*************************************************************************/
const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes'))

    notes.forEach((note) => {
        console.log(note.title) // list of all titles
    })
}

//************************************************************************ */
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)// fetching 1st matching record

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}
// Extra useful functions
//********************>>>>To Save array having data to notes.json file again <<<<************* */
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')// data as buffer
        const dataJSON = dataBuffer.toString()         // data in json string
        return JSON.parse(dataJSON)                    // data in javascript object
    } catch (e) {
        return []                                      // return empty array when no file is there
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}