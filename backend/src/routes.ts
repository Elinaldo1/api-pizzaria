import { Router } from 'express';
import multer from 'multer';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import AuthUserController from './controllers/user/AuthUserController';
import CreateUserController from './controllers/user/CreateUserController';
import DetailUserController from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';

import uploadConfig from './config/multer';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

const router = Router();

const upload = multer(uploadConfig.upload('./tmp'));
  

// User bate na rota(endpoint) => aciona o controller(que pega dados em caso haja envio do frontEnd)
// controller acionao service que executa algo e devolve a resposta ao controller=>resposta é devolvida ao user

// ROTAS USER============,,,,,
router.post('/users', CreateUserController.handle)

router.post('/session', AuthUserController.handle)

router.get('/me', isAuthenticated, DetailUserController.handle)

// ROTAS CATEGORY============
router.post('/category', isAuthenticated, new  CreateCategoryController().handle);

router.get('/categories', isAuthenticated, new ListCategoryController().handle)

// ROTAS PRODUCT============
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

// ROTAS ORDER
router.post('/order', isAuthenticated, new CreateOrderController().handle);

export { router };

