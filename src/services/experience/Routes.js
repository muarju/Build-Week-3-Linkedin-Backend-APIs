import { Router } from 'express'
import createError from 'http-errors'
import ExpModel from './schema.js'
import multer from 'multer'
import { mediaStorage } from '../../tools/saveImageCloudinary.js'


const expRouter = Router()


expRouter.get('/', async (req, res, next) => {

    try {
        const data = await ExpModel.find()
        res.send(data)

    } catch (error) {
        console.log(error);
        next(error)
    }
})

expRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await ExpModel.findById(id)
        if (data) {
            res.status(201).send(data)
        } else {
            next(createError(404, `Experience with id: ${id} not found!`))
        }

    } catch (error) {
        console.log(error);
        next(error)
    }
})

expRouter.post('/', async (req, res, next) => {
    try {
        const data = new ExpModel(req.body)
        await data.save()
        res.status(201).send(data._id)
    } catch (error) {
        console.log(error);
        next(error)
    }
})

expRouter.put('/:id', async (req, res, next) => {
    try {
        const data = await ExpModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })

        if (data) {
            res.send(data)
        } else {
            next(createError(404, `Experience with id: ${id} not found!`))
        }

    } catch (error) {
        console.log(error);
        next(error)
    }
})

expRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await ExpModel.findByIdAndDelete(id)

        if (data) {
            res.status(200).send(`The Experience with ID: ${id} has been successfully deleted!`)
        } else {
            next(createError(404, `Experience with ID: ${id} not found!`))
        }

    } catch (error) {
        console.log(error);
        next(error)
    }
})

expRouter.post("/:id/image", multer({ storage: mediaStorage }).single("image"), async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await ExpModel.findById(id)
        if (data) {
            const modifiedExperience = await ExpModel.findByIdAndUpdate(id, { image: req.file.path }, {
                new: true
            })
            res.send(modifiedExperience)
        } else {
            next(createError(404, `Experience with id: ${id} not found!`))
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
})


export default expRouter