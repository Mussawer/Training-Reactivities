import { observer } from 'mobx-react-lite';
import React, { FC } from 'react'
import { Link } from 'react-router-dom';
import { List, Popup, Image } from 'semantic-ui-react';
import { Profile } from '../../../app/types/profile';
import ProfileCard from '../../profiles/ProfileCard';

interface ActivityAttendeesListProps {
    attendees: Profile[];
}

const ActivityAttendeesList: FC<ActivityAttendeesListProps> = ({ attendees }) => {
    return (
        <List horizontal>
            {attendees.map(attendee => (
                <Popup
                    hoverable
                    key={attendee.userName}
                    trigger={
                        <List.Item key={attendee.userName} as={Link} to={`/profiles/${attendee.userName}`}>
                            <Image size='mini' circular src={attendee.image || '/assets/user.png'} />
                        </List.Item>
                    }
                >
                    <Popup.Content>
                        <ProfileCard profile={attendee} />
                    </Popup.Content>
                </Popup>
            ))}
        </List>
    )
}

export default observer(ActivityAttendeesList);