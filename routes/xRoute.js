import { handleGetTweet} from "../controllers/xController.js";

export default function xRoute(router) {
    router.get('/', handleGetTweet);
    // router.post('/', handlePostTweet);
    return router;
}