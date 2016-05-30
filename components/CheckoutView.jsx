
import React from 'react';


class CheckoutView extends React.Component
{
    render(){
        return (
                  <div className="container">
                    <div className="row" style={{marginLeft: "30%"}}>
                        <form role="form">
                            <div className="col-lg-6">
                                <div className="well well-sm"><strong><span className="glyphicon glyphicon-asterisk"></span>Required Field</strong></div>
                                <div className="form-group">
                                    <label for="InputName">Enter Name</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" name="InputName" id="InputName" placeholder="Enter Name" required/>
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-asterisk"></span></span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="InputEmail">Enter Email</label>
                                    <div className="input-group">
                                        <input type="email" className="form-control" id="InputEmailFirst" name="InputEmail" placeholder="Enter Email" required/>
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-asterisk"></span></span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="InputEmail">Confirm Email</label>
                                    <div className="input-group">
                                        <input type="email" className="form-control" id="InputEmailSecond" name="InputEmail" placeholder="Confirm Email" required/>
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-asterisk"></span></span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="InputMessage">Enter Message</label>
                                    <div className="input-group">
                                        <textarea name="InputMessage" id="InputMessage" className="form-control" rows="5" required></textarea>
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-asterisk"></span></span>
                                    </div>
                                </div>
                                <input type="submit" name="submit" id="submit" value="Submit" className="btn btn-info pull-right"/>
                            </div>
                        </form>

                    </div>
               
                </div>
                
        );
    }

}


export default CheckoutView