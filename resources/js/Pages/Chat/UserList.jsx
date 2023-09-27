import { Button, Card, Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import echo from "@/Components/EchoComponent/Echo";
import { Link } from "@inertiajs/react";
import useOnlineStatusChannel from "@/Hooks/useOnlineStatusChannel";
const UserList = ({user}) => {
    const [users, setUsers] = useState([]);
    const [userStatuses, setUserStatuses] = useState({});
    const channel = echo.channel("online-status");


    useEffect(() => {
        axios.get('/users')
            .then((response) =>  {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });


            echo.join("online-status")
            .here((usersOnline) => {
                console.log(usersOnline);
                // Handle users online status
                setUsers((prevUsers) => {
                    return prevUsers.map((u) => {
                        const isOnline = usersOnline.some((onlineUser) => onlineUser.id === u.id);
                        return { ...u, isOnline: isOnline };
                    });
                });
            })
            .joining((user) => {
                console.log(`${user.name} joined the presence channel`);
                axios.put(`/users/${user.id}/update-status-online`);
                setUsers((prevUsers) => {
                    return prevUsers.map((u) => {
                        if (u.id === user.id) {
                            return { ...u, isOnline: true };
                        }
                        return u;
                    });
                });
            })
            .leaving((user) => {
                console.log(`${user.name} left the presence channel`);
                axios.put(`/users/${user.id}/update-status-offline`);
                setUsers((prevUsers) => {
                    return prevUsers.map((u) => {
                        if (u.id === user.id) {
                            return { ...u, isOnline: false };
                        }
                        return u;
                    });
                });
            });

    }, []);

    return (
        <div className="mb-3">
            {users.map((user) => (
            <Card className="mx-auto" key={user.id} style={{ width: '100%' }}>
                <Container>
                    <Row>
                        <Col className="d-flex align-items-center">
                            <div
                                style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                }}
                            >
                                <img
                                src={'/images/' + user.image} // Replace with your image URL
                                alt="Profile"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        </Col>
                        <Col xs={6} className="d-flex align-items-center">
                            <Card.Body>
                                <Card.Title>{user.name}</Card.Title>
                                <Card.Text style={{ fontSize: '0.8rem' }}>
                                <span className={`fw-bold ${user.isOnline ? 'text-success' : 'text-danger'}`}>
                                    {user.isOnline ? 'Online' : 'Offline'}
                                </span>
                                </Card.Text>
                            </Card.Body>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <div className="d-flex align-items-center">
                                <Link href={`/chat-page/${user.id}`}>
                                    <Button>message</Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Card>
            ))}
        </div>
    );
}

export default UserList;
