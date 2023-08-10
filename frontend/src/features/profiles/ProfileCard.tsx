import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../app/types/profile";

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: FC<ProfileCardProps> = ({ profile }) => {
  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
      <Image src={profile.image || "/assets/user.png"} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description extra>
          <Icon name="user" />
          20 followers
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default observer(ProfileCard);
