import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardText, MDBCardImage } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { excerpt } from '../utility';

const RelatedTours = ({ relatedTours, tourId }) => {
  return (
    <>
        {relatedTours && relatedTours.length > 0 && (
            <>
                {relatedTours.length > 1 && <h4>Related Tours</h4>}
                <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                    {relatedTours
                        .filter((tour) => tour._id !== tourId)
                        .splice(0, 3)
                        .map((item) => (
                            <MDBCol key={item._id}>
                                <MDBCard>
                                    <Link to={`/tour/${item._id}`}>
                                        <MDBCardImage src={item.imageFile} alt={item.title} position="top" />
                                    </Link>
                                    <span className="text-start tag-card">
                                        {item.tags.map((tag, index) => (
                                            <Link key={index} to={`/tours/tag/${tag}`}> #{tag}</Link>
                                        ))}
                                    </span>
                                    <MDBCardBody>
                                        <MDBCardText className='text-start'>{item.title}</MDBCardText>
                                        <MDBCardText className='text-start'>{excerpt(item.description, 45)}</MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        ))
                    }
                </MDBRow>
            </>
        )}
    </>
  )
}

export default RelatedTours;