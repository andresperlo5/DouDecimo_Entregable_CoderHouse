const userModel = require('../models/user.model')


exports.RegisterUSer = async (req, res) => {
    try {

        const userExists = await userModel.findOne({ usuario: req.body.usuario })

        if (!userExists) {
            const newUSer = await new userModel(req.body)
            newUSer.save()
            res.send(newUSer)
        } else {
            res.status(400).json({ msg: 'usuario ya existe' })
        }

    } catch (error) {
        console.log('Error', error)
    }
}

exports.LoginUSer = async (req, res) => {
    try {

        const { usuario, contrasenia } = req.body

        const userExists = await userModel.findOne({ usuario })

        if (!userExists) {
            res.status(400).json({ msg: 'usuario no existe' })
        }
        if (userExists.contrasenia !== contrasenia) {
            res.status(400).json({ msg: 'contrasenia no igual' })
        }


        userExists.login = true
        userExists.save()

        const usuarioCookie = (req.session.usuario = usuario)
        const contraseniaCookie = (req.session.contrasenia = contrasenia)

        console.log('usuarioCookie', usuarioCookie)
        console.log('contraseniaCookie', contraseniaCookie)

        res.status(200).redirect(`/api/productos-test/`)

    } catch (error) {
        console.log('error', error)
    }
}

exports.LogoutUSer = async (req, res) => {
    try {

        const usuarioCookie = req.session.usuario
        const userLog = await userModel.findOne({ usuario: usuarioCookie })

        if (!userLog) {
            res.status(404).json({ msg: 'usuario no encontrado' })
        } else {

            userLog.login = false
            userLog.save()

            req.session.destroy((err) => {
                if (err) console.log(err)
            })

            res.render('logout', { info: userLog })

        }

    } catch (error) {
        console.log('error', error)
    }
}