import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../app/types/profile";
import FollowButton from "./FollowButton";

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: FC<ProfileCardProps> = ({ profile }) => {
  return (
    <Card as={Link} to={`/profiles/${profile.userName}`}>
      <Image src={profile.image || "/assets/user.png"} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>
          {profile.bio && profile.bio?.length > 40
            ? profile.bio?.slice(0, 37) + "..."
            : profile.bio}
        </Card.Description>
        <Card.Description>
          <Icon name="user" />
          {profile.followersCount} followers
        </Card.Description>
      </Card.Content>
      <FollowButton profile={profile} />
    </Card>
  );
};

export default observer(ProfileCard);
