import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import newsletterRouter from "./newsletter";
import adminRouter from "./admin";
import contentRouter from "./content";
import siteRouter from "./site";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(newsletterRouter);
router.use(adminRouter);
router.use(contentRouter);
router.use(siteRouter);

export default router;
