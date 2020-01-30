import models from '../models';
import pusherConfig from './pusherConfig';
export default {
    async newCommentNotification(postId, commenterId) {
      const post = await models.Post.findOne({ where: { id: postId }, });
      const commenter = await models.User.findOne({ where: { id: commenterId } });
      const { userId, title } = post ;
      const commenterName = commenter.username;
      console.log(commenterName)
      const body = `${commenterName} just commented on your article: ${title}`;
      console.log(body)
      await models.Notification.create({ userId, body, status: 'unread' });
  
      pusherConfig.trigger('notification', 'my-event', body);
    },
}