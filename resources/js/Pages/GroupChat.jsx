import Layout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import  GroupChatBox from '../Pages/GroupChat/GroupChatBox';


const GroupChat = ({auth}) => {
  return (
    <>
        <Head title="Group Chat" />
        <div className="py-4">
                <Container>
                    <Row >
                        <GroupChatBox auth={auth}/>
                    </Row>
                </Container>
        </div>
    </>
  );
};

GroupChat.layout = (page) => (
  <Layout user={page.props.auth.user} title="Chat" header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Group Chat</h2>}>
    {page}
  </Layout>
);

export default GroupChat;
