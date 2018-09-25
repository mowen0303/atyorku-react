import React, { Component } from 'react';


export default class BookDetailPage extends Component {

    constructor(){
        super();
        this.state = {
            bookDetailData: {},
            bookImg: ''
        }
    }

    componentDidMount(){
        this.getBookDetail();
    }

    getBookDetail(){
        const id = this.props.params.bookId;
        //console.log(id);
        fetch("http://www.atyorku.ca/admin/book/bookController.php?action=getBookByIdWithJson&id=" + id)
            .then(response => response.json())
            .then(responseData => {
                if(responseData.code === 1){
                    this.setState({
                        bookDetailData: responseData.result,
                    });
                    console.log(responseData.result);
                    if(responseData.result.thumbnail_url === "") {
                        this.setState({
                            bookImg: "" //默认图片
                        })
                    }else {
                        this.setState({
                            bookImg: "http://www.atyorku.ca/" + responseData.result.thumbnail_url
                        })
                    }
                }else{
                    alert('访问的资料不存在或已下架');
                    window.location.href = "http://www.atyorku.ca/";
                }
            })
    }


    render(){
        const {bookDetailData} = this.state;
        return(
            <div>
                <div className="text-center" style={{backgroundColor: "#373737"}}>
                    {
                        this.state.bookImg !== "" ?
                        <img src={this.state.bookImg} className="" style={{maxWidth: "75%", height: "auto"}}/>
                            : false
                    }
                </div>
                <div className="container" style={{ marginBottom: "0"}}>
                    {
                        Object.keys(bookDetailData).length > 0 ?
                            <h3 style={{marginTop: "20px"}}>{bookDetailData.course_code_parent_title} {bookDetailData.course_code_child_title}</h3>
                            : false
                    }
                    {
                        Object.keys(bookDetailData).length > 0 ?
                            <p style={{marginBottom: "0"}}>
                                <span className="badge badge-warning">{bookDetailData.book_category_name}</span>
                                {bookDetailData.is_e_document === "1" ? <span className="badge badge-info" style={{marginLeft: "5px"}}>电子版</span> : <span className="badge badge-danger" style={{marginLeft: "2%"}}>实体版</span> }
                            </p> : false
                    }
                    {Object.keys(bookDetailData).length > 0 ? <p style={{color: "#ff1722", fontSize: "20px", fontWeight: 'bold'}}>$ {bookDetailData.price}</p> : false}
                    {
                        Object.keys(bookDetailData).length > 0 ?
                            <p style={{marginBottom: "0"}}>
                                {/**学期icon**/
                                    bookDetailData.term_year === "0" && bookDetailData.term_semester === "" ? "未填写学年" :
                                        <span>{bookDetailData.term_year !== "0" ? `${bookDetailData.term_year}  ` : ""}{bookDetailData.term_semester}</span>
                                }
                            </p> : false
                    }
                    {/**教授icon**/
                        Object.keys(bookDetailData).length > 0 ?
                            <p>
                                <span>{bookDetailData.prof_name === "" ? "未填写教授" : bookDetailData.prof_name}</span>
                            </p> : false
                    }
                    {
                        Object.keys(bookDetailData).length > 0 ?
                            <p style={{
                                backgroundColor: "#dedede",
                                color: "#717171",
                                borderBottomLeftRadius: 5,
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5,
                                borderBottomRightRadius: 5,
                                padding: 12,
                            }}>{bookDetailData.name}</p>
                            : false
                    }
                    {/**访问量icon**/
                        Object.keys(bookDetailData).length > 0 ?
                            <p style={{marginBottom: "0"}}>
                                <span>{bookDetailData.count_view}</span>
                            </p> : false
                    }
                    {/**发布时间icon**/
                        Object.keys(bookDetailData).length > 0 ?
                            <p style={{marginBottom: "0"}}>
                                <span>{bookDetailData.publish_time}</span>
                            </p> : false
                    }
                </div>
                <hr style={{borderWidth: "10px"}} />
                <div className="container">
                    <p style={{fontWeight: "bold"}}>卖家信息</p>
                    {
                        Object.keys(bookDetailData).length > 0 ?
                            <p style={{display: "flex", height: "30px", alignItems: "center"}}>
                                <img src={`http://www.atyorku.ca/${bookDetailData.img}`} style={{borderRadius: "50%", width: "25px", height: "25px"}} />
                                <span style={{marginLeft: "10px"}}>{bookDetailData.alias}</span>
                            </p>
                            : false
                    }
                    {
                        Object.keys(bookDetailData).length > 0 ?
                            <p style={{
                                backgroundColor: "#dedede",
                                color: "#717171",
                                borderBottomLeftRadius: 5,
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5,
                                borderBottomRightRadius: 5,
                                padding: 12,
                            }}>{bookDetailData.description}</p>
                            : false
                    }
                    {
                        Object.keys(bookDetailData).length > 0 ?
                            <p style={{textAlign: "center"}}>
                                <small style={{color: "#434343"}}>{bookDetailData.pay_with_points === "0" ? "注意：我只接受现金交易，请通过我预留的联系方式与我联系。" : ""}</small>
                            </p>
                            : false
                    }
                </div>
            </div>
        );
    }
}