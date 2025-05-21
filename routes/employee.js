 import express from 'express'
 import multer from "multer";
 import { addEmployee, getEmployees, getEmployee, updateEmployee} from '../controllers/employeeController.js'
 import { milestoneNotification } from '../controllers/notificationController.js'
 import { importData } from '../controllers/importDataController.js'
 import authMiddleware from '../middleware/authMiddleware.js'


 const router = express.Router()
 const upload = multer({ dest: "uploads/" }); 

 router.get('/notification', authMiddleware, milestoneNotification)
 router.get('/', authMiddleware, getEmployees)
 router.post('/upload-csv', authMiddleware, upload.single("file"), importData)
 router.post('/add', authMiddleware, addEmployee)
 router.get('/:id', authMiddleware, getEmployee)
 router.put('/:id', authMiddleware, updateEmployee)



 export default router


