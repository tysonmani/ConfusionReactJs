import React, { Component } from "react";
import { Card,CardImg,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem,Button,ModalBody,Label,Modal,ModalHeader} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

function RenderDish({ dish }) {
    if (dish != null)
        return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    else return <div></div>;
}

function RenderComments({ comments }) {
    let comment = null;

    if (comments) {
        comment = comments.map((comment) => {
            return (
                <li key={comment.id}>
                    {comment.comment}
                    <br></br>
                    <br></br>
          --{comment.author} ,
                    {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                    }).format(new Date(Date.parse(comment.date)))}
                    <br></br>
                    <br></br>
                </li>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">{comment}</ul>
            </div>
        );
    } else return <div></div>;
}

const DishDetail = (props) => {
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/menu">Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                    <CommentForm />
                </div>
            </div>
        </div>
    );
};

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
    state = {
        isModalOpen: false,
    };

    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    handleSubmit = (values) => {
        this.toggleModal();
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
    };

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span>Submit Comment
        </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select
                                    model=".rating"
                                    id="rating"
                                    name="rating"
                                    className="form-control"
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="rating">Your Name</Label>
                                <Control.text
                                    model=".yourname"
                                    id="yourname"
                                    name="yourname"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required,
                                        minLength: minLength(3),
                                        maxLength: maxLength(15),
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".yourname"
                                    show="touched"
                                    messages={{
                                        required: "Required ",
                                        minLength: "Must be greater than 2 characters",
                                        maxLength: "Must be 15 characters or less",
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea
                                    model=".comment"
                                    id="comment"
                                    name="comment"
                                    rows="6"
                                    className="form-control"
                                    validators={{
                                        required,
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".comment"
                                    show="touched"
                                    messages={{
                                        required: "Required ",
                                    }}
                                />
                            </div>
                            <Button type="submit" value="submit" color="primary">
                                Submit
              </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default DishDetail;