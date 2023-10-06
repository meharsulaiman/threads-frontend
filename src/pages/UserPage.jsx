import UserHeader from '../components/UserHeader';
import UserPost from '../components/UserPost';

const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserPost
        likes={1200}
        replies={481}
        postImg='/post1.png'
        postTitle="Let's talk about threads."
      />
      <UserPost
        likes={2900}
        replies={251}
        postImg='/post2.png'
        postTitle='Why do you need to learn React?'
      />
      <UserPost
        likes={1200}
        replies={481}
        postImg='/post3.png'
        postTitle='Are you a good developer?'
      />
      <UserPost
        likes={1200}
        replies={481}
        // postImg='/post4.png'
        postTitle='This is my first post! 🎉'
      />
    </>
  );
};

export default UserPage;
