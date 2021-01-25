import { PostRestriction } from "resources/models/post";
import { PostProps } from "resources/models/post";

export const fooPost: PostProps = {
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla varius nisl consectetur ligula porta, sed vulputate metus convallis. Nam aliquet fermentum nulla ac accumsan. Sed dui quam, tincidunt ac facilisis vel, lacinia id orci. Donec iaculis malesuada iaculis. Fusce semper erat vel nunc lacinia venenatis. Pellentesque sit amet vestibulum enim, a imperdiet nisi. Etiam convallis magna ac finibus rutrum. Morbi libero lorem, pharetra eget pellentesque at, tempor non lectus. Etiam id orci non nibh dignissim sagittis vulputate ut tellus. Nullam molestie nec dolor pulvinar luctus. Nulla vitae elit id diam lacinia luctus. Praesent tristique, lacus malesuada sodales laoreet, nunc magna porta mi, ac pretium enim turpis sed nibh. Vivamus gravida ligula a suscipit volutpat. Proin commodo vestibulum convallis. Cras convallis lectus interdum suscipit ornare.",
  title: "Lorem ipsum dolor sit amet",
  canComment: false,
  postAccessUsers: [],
  id: 0,
  overview:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla varius nisl consectetur ligula porta, sed vulputate metus convallis. Nam aliquet fermentum nulla ac accumsan. Sed dui quam, tincidunt ac facilisis vel, lacinia id orci. Donec iaculis malesuada iaculis. Fusce semper erat vel nunc lacinia venenatis. Pellentesque sit amet vestibulum enim, a imperdiet nisi. Etiam convallis magna ac finibus rutrum. Morbi libero lorem, pharetra eget pellentesque at, tempor non lectus. Etiam id orci non nibh dignissim sagittis vulputate ut tellus. Nullam molestie nec dolor pulvinar luctus. Nulla vitae elit id diam lacinia luctus. Praesent tristique, lacus malesuada sodales laoreet, nunc magna porta mi, ac pretium enim turpis sed nibh. Vivamus gravida ligula a suscipit volutpat. Proin commodo vestibulum convallis. Cras convallis lectus interdum suscipit ornare.",
  createdAt: new Date().toISOString(),
  createdBy: "anonymouse",
  postRestrictionType: PostRestriction.NONE,
  commentCount: 0,
  viewCount: 0,
};
