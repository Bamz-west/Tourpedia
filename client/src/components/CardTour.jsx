import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBCardGroup, MDBBtn, MDBIcon, MDBTooltip } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likeTour } from '../redux/features/tourSlice';
import { excerpt } from '../utility';

const CardTour = ({ imageFile, description, title, name, tags, _id, likes }) => {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => ({ ...state.auth }));

    const userId = user?.result?._id || user?.result?.googleId;

    const Likes = () => {
        if(likes.length > 0) {
            return likes.find((like) => like === userId) ? (
                <>
                    <MDBIcon fas icon="thumbs-up" />
                    &nbsp;
                    {likes.length > 2 ? (
                        <MDBTooltip tag="a" title={`You and ${likes.length - 1} others liked this`}>
                            {likes.length} Likes
                        </MDBTooltip>
                    ): (
                        `${likes.length} Like${likes.length > 1 ? 's' : ""}`
                    )}
                </>
            ) : (
                <>
                    <MDBIcon far icon='thumbs-up' />
                    &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
                </>
            )
        }
        return (
            <>
                <MDBIcon far icon="thumbs-up" />
                &nbsp;Like
            </>
        );
    }

    const handleLike = () => {
        dispatch(likeTour({ _id }));
    }

    return (
        <MDBCardGroup>
            <MDBCard className='h-100 mt-2 d-sm-flex' style={{maxWidth: "20rem"}}>
                <MDBCardImage src={imageFile} alt={title} position="top" style={{maxWidth: "100%", height: "180px"}} />
                <div className='top-left'>{name}</div>
                <span className='text-start tag-card'>
                    {tags.map((tag) => (
                        <Link to={`/tours/tag/${tag}`} key={tag}> #{tag}</Link>
                    ))}
                    <MDBBtn style={{ float: "right", marginRight: "5px" }} tag="a" color='none' onClick={!user?.result ? null : handleLike}>
                        {!user?.result ? (
                            <MDBTooltip title="Please login to like tour" tag="a">
                                <Likes />
                            </MDBTooltip>
                        ) : (
                            <Likes />
                        )}
                    </MDBBtn>
                </span>
                <MDBCardBody>
                    <MDBCardTitle className='text-start'>{title}</MDBCardTitle>
                    <MDBCardText className='text-start'>
                        {excerpt(description, 45)}
                        <Link to={`/tour/${_id}`}>Read More</Link>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </MDBCardGroup>
    );
}

export default CardTour;