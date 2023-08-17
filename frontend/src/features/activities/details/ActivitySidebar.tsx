import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Item, Label, List, Segment, Image } from "semantic-ui-react";
import { Activity } from "../../../app/types/activity";

interface ActivitySidebarProps {activity: Activity;}

const ActivitySidebar: FC<ActivitySidebarProps> = ({activity : {host, attendees}}) => {
  if(!attendees) return null; 
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map(attendee => (

          <Item style={{ position: "relative" }} key={attendee.userName}>
            <Label style={{ position: "absolute" }} color="orange" ribbon="right">
              Host
            </Label>
            <Image size="tiny" src={attendee.image || "/assets/user.png"} />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link to={`profile/${attendee.userName}`}>{attendee.userName}</Link>
              </Item.Header>
              <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
            </Item.Content>
          </Item>
          ))}
        </List>
      </Segment>
    </>
  );
};

export default observer(ActivitySidebar);
