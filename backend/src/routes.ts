import { Router } from 'express'

import SessionController from './controllers/UserController/SessionController'
import UsersController from './controllers/UserController/UsersController'
import UsersDashboard from './controllers/UserController/UsersDashboard'
import TipoUsersController from './controllers/UserController/TipoUsersController'
import NotificationController from './controllers/UserController/NotificationController'
import GetAnswerSecurity from './controllers/UserController/GetAnswerSecurity'
import UploadController from './controllers/UploadController'

import CategoriaController from './controllers/PublicationController/CategoriaController'
import TagsController from './controllers/PublicationController/TagsController'
import FerramentasController from './controllers/PublicationController/FerramentasController'
import ConteudosController from './controllers/PublicationController/ConteudosController'
import ComentariosController from './controllers/PublicationController/ComentariosController'
import LikesController from './controllers/PublicationController/LikesController'

import TopicoController from './controllers/CommunityController/TopicoController'
import RespostaController from './controllers/CommunityController/RespostaController'

import Authorizations from './auth/Authorizations'

// Multer
import multer from 'multer'
import multerConfig from './configs/multer'

const routes = Router()

const upload = multer(multerConfig)

routes.post(
  '/uploads',
  upload.single('upload'),
  UploadController.store
);

routes.post('/signup', SessionController.signup)
routes.post('/signin', SessionController.signin)
routes.post('/forgot', SessionController.forgotPassword)
routes.patch('/changePassword', Authorizations.show, SessionController.changePassword)
routes.put('/users/security', Authorizations.show, SessionController.changeSecurity)
routes.get('/users/secutiry/answer', GetAnswerSecurity.show)

routes.post('/authenticated', Authorizations.show, Authorizations.authenticated)

routes.get('/notifications', Authorizations.show, NotificationController.index)
routes.delete('/notifications', Authorizations.show, NotificationController.delete)

routes.get('/users', UsersController.index)
routes.get('/users/home/info', Authorizations.show, UsersController.show)
routes.get('/users/:id/info', UsersDashboard.show)
routes.put('/users', Authorizations.show, UsersController.update)

routes.put('/admin/users/tipo_user', Authorizations.show, TipoUsersController.update)

routes.get('/categorias', CategoriaController.index)
routes.post('/categorias', Authorizations.show, CategoriaController.store)
routes.put('/categorias/:id_categoria', Authorizations.show, CategoriaController.update)

routes.get('/tags', TagsController.index)
routes.post('/tags', Authorizations.show, TagsController.store)
routes.put('/tags/:id_tag', Authorizations.show, TagsController.update)

routes.get('/ferramentas', FerramentasController.index)
routes.post('/ferramentas', Authorizations.show, FerramentasController.store)
routes.put('/ferramentas/:id_ferramenta', Authorizations.show, FerramentasController.update)

routes.get('/conteudos', ConteudosController.index)
routes.get('/conteudos/:id_conteudo', ConteudosController.show)
routes.post('/conteudos', Authorizations.show, ConteudosController.store)
routes.put('/conteudos/:id_conteudo', Authorizations.show, ConteudosController.update)
routes.delete('/conteudos/:id_conteudo', Authorizations.show, ConteudosController.delete)

routes.get('/comentarios/:id_conteudo', ComentariosController.index)
routes.post('/comentarios/:id_conteudo', Authorizations.show, ComentariosController.store)
routes.put('/comentarios/:id_comentario', Authorizations.show, ComentariosController.update)
routes.delete('/comentarios/:id_comentario', Authorizations.show, ComentariosController.delete)

routes.post('/conteudos/likes/:id_conteudo',  Authorizations.show, LikesController.store)
routes.delete('/conteudos/likes/:id_conteudo', Authorizations.show, LikesController.delete)

routes.get('/comunidade/topico', TopicoController.index)
routes.post('/comunidade/topico', Authorizations.show, TopicoController.store)
routes.put('/comunidade/topico/:id_topico_comunidade', Authorizations.show, TopicoController.update)

routes.get('/comunidade/resposta/:id_topico_comunidade', RespostaController.index)
routes.post('/comunidade/resposta/:id_topico_comunidade', Authorizations.show, RespostaController.store)
routes.put('/comunidade/resposta/:id_topico_comunidade', Authorizations.show, RespostaController.update)

export default routes