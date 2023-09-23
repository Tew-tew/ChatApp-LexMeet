import { Button, Card, Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import echo from "@/Components/EchoComponent/Echo";
import { Link } from "@inertiajs/react";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch the initial user data
        axios.get('/users')
            .then((response) =>  {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });


            echo.join("online-status")
            .here((usersOnline) => {
                // Handle users online status
                setUsers((prevUsers) => {
                    return prevUsers.map((u) => {
                        const isOnline = usersOnline.some((onlineUser) => onlineUser.id === u.id);
                        return { ...u, isOnline: isOnline };
                    });
                });
            })
            .joining((user) => {
                axios.put(`/users/${user.id}/update-status-online`)
                            .then(response => {
                            })
                            .catch(error => {
                            });
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
                axios.put(`/users/${user.id}/update-status-offline`)
                    .then(response => {
                    })
                    .catch(error => {
                    });
                setUsers((prevUsers) => {
                    return prevUsers.map((u) => {
                        if (u.id === user.id) {
                            return { ...u, isOnline: false };
                        }
                        return u;
                    });
                });
            });

        // Clean up when the component unmounts
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
