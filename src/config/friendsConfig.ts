import type { FriendLink, FriendsPageConfig } from "../types/friendsConfig";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
  // 页面标题，如果留空则使用 i18n 中的翻译
  title: "",

  // 页面描述文本，如果留空则使用 i18n 中的翻译
  description: "",

  // 是否显示底部自定义内容（friends.mdx 中的内容）
  showCustomContent: true,

  // 是否显示评论区，需要先在commentConfig.ts启用评论系统
  showComment: true,

  // 是否开启随机排序配置，如果开启，就会忽略权重，构建时进行一次随机排序
  randomizeSort: false,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
  {
    title: "夏夜流萤",
    imgurl:
      "https://weavatar.com/avatar/d252655d40d6874417a720bad0a6c5f77f8f6a1fd2f882f8f338402dc37e4190?s=640",
    desc: "飞萤之火自无梦的长夜亮起，绽放在终竟的明天。",
    siteurl: "https://blog.cuteleaf.cn",
    tags: ["Blog"],
    weight: 11, // 权重，数字越大排序越靠前
    enabled: false, // 是否启用
  },
  {
    title: "lvy",
    imgurl: "https://lvyovo-wiki.tech/images/avatar.png",
    desc: "很强的小姐姐，Web全栈、AI、算法都会，知识区UP养成中",
    siteurl: "https://lvyovo-wiki.tech",
    tags: ["Web全栈", "AI", "算法"],
    enabled: true,
    weight: 9,
  },
  {
    title: "feitwnd",
    imgurl: "https://avatars.githubusercontent.com/u/195735767?v=4",
    desc: "二次元浓度较高的Web全栈开发者",
    siteurl: "https://blog.feitwnd.cc",
    tags: ["Web全栈"],
    enabled: true,
    weight: 10,
  },
];

// 获取启用的友链并进行排序
export const getEnabledFriends = (): FriendLink[] => {
  const friends = friendsConfig.filter((friend) => friend.enabled);

  if (friendsPageConfig.randomizeSort) {
    return friends.sort(() => Math.random() - 0.5);
  }

  return friends.sort((a, b) => b.weight - a.weight);
};
