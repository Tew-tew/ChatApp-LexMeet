import Layout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UserList from '../Pages/Chat/UserList';
import { Container, Row, Col } from 'react-bootstrap';

const Dashboard = ({auth}) => {
    return (
        <>
            <Head title="Dashboard" />
            <div className="py-8">
                <Container>
                    <Row >
                        <Col className="mx-auto" style={{ maxHeight: '600px', maxWidth: '60%', overflowY: 'auto' }}>
                            <UserList user={auth} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

Dashboard.layout = (page) => (
    <Layout user={page.props.auth.user} title="Chat" header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}>
      {page}
    </Layout>
  );

  export default Dashboard;
