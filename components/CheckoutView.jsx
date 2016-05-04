
var React = require('react');
var  ContactForm = require('./ContactForm.jsx')


var CheckoutView = React.createClass({
  getInitialState: function() {
    return {
      email: true
    , question: true
    , submitted: null
    }
  }

, render: function() {
    var submitted
    if (this.state.submitted !== null) {
      submitted = <div className="alert alert-success">
        <p>ContactForm data:</p>
        <pre><code>{JSON.stringify(this.state.submitted, null, '  ')}</code></pre>
      </div>
    }

    return <div>
      <div className="panel panel-default">
        <div className="panel-heading clearfix">
          <h3 className="panel-title pull-left">Contact Form</h3>
          <div className="pull-right">
            <label className="checkbox-inline">
              <input type="checkbox"
                checked={this.state.email}
                onChange={this.handleChange.bind(this, 'email')}
              /> Email
            </label>
            <label className="checkbox-inline">
              <input type="checkbox"
                checked={this.state.question}
                onChange={this.handleChange.bind(this, 'question')}
              /> Question
            </label>
          </div>
        </div>
        <div className="panel-body">
          <ContactForm ref="contactForm"
            email={this.state.email}
            question={this.state.question}
            company={this.props.company}
          />
        </div>
        <div className="panel-footer" style = {{marginLeft: "auto",marginRight: "auto"}}>
          <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit} style = {{width:"200px"}}>Submit</button>
        </div>
      </div>
      {submitted}
    </div>
  }

, handleChange: function(field, e) {
    var nextState = {}
    nextState[field] = e.target.checked
    this.setState(nextState)
  }

, handleSubmit: function() {
    if (this.refs.contactForm.isValid()) {
      this.setState({submitted: this.refs.contactForm.getFormData()})
    }
  }
})





module.exports = CheckoutView;