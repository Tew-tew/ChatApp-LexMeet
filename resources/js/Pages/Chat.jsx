import Layout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ChatBox from './Chat/ChatBox';


const Chat = ({auth, recipientId}) => {
  return (
    <>
        <Head title="Chat Page" />
        <div className="py-4">
                <Container>
                    <Row >
                        <ChatBox auth={auth} recipientId={recipientId}/>
                    </Row>
                </Container>
        </div>
    </>
  );
};

Chat.layout = (page) => (
  <Layout user={page.props.auth.user} title="Chat" header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Chat</h2>}>
    {page}
  </Layout>
);

export default Chat;
