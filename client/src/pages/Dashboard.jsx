import { useEffect } from 'react';
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCardGroup } from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { deleteTour, getToursByUser } from '../redux/features/tourSlice';
import Spinner from '../components/Spinner';
import { excerpt } from '../utility';

const Dashboard = () => {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => ({...state.auth}));
    const { userTours, loading } = useSelector((state) => ({...state.tour}));
    const userId = user?.result?._id;

    useEffect(() => {
        if(userId) {
            dispatch(getToursByUser(userId));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const handleDelete = (id) => {
        if(window.confirm("Are you sure?")) {
            dispatch(deleteTour({ id, toast }));
        }
    }

    if(loading) {
        return <Spinner />;
    };
    

    return (
        <div style={{margin: "auto", padding: "120px", maxWidth: "900px", alignContent: "center"}}>
            {userTours.length === 0 && (
                <h3 className="text-center">No Tour available for user: {user?.result?.name}</h3>
            )}

            {userTours.length > 0 && (
                <>
                    <h5 className="text-center">Dashboard: {user?.result?.name}</h5>
                    <hr style={{maxWidth: "570px"}} />
                </>
            )}
            {userTours && userTours.map((tour) => (
                <MDBCardGroup key={tour._id}>
                    <MDBCard style={{maxWidth: "600px"}} className="mt-2">
                        <MDBRow className='g-0'>
                            <MDBCol md="4">
                                <MDBCardImage className='rounded' src={tour.imageFile} alt={tour.title} fluid />
                            </MDBCol>
                            <MDBCol md="8">
                                <MDBCardBody>
                                    <MDBCardTitle className='text-start'>{tour.title}</MDBCardTitle>
                                    <MDBCardText className='text-start'>
                                        <small className="text-muted">{excerpt(tour.description, 40)}</small>
                                    </MDBCardText>
                                    <div style={{marginLeft: "5px", float: "right", marginTop: "-60px"}}>
                                        <MDBBtn className='mt-1' tag="a" color='none'>
                                            <MDBIcon fas icon='trash'style={{color: "#DD4B39"}} size="lg" onClick={() => handleDelete(tour._id)} />
                                        </MDBBtn>
                                        <Link to={`/editTour/${tour._id}`}>
                                            <MDBIcon fas icon='edit'style={{color: "#55ACEE", marginLeft: "10px"}} size="lg" />
                                        </Link>
                                    </div>
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCardGroup>
            ))}
        </div>
    );
}

export default Dashboard;