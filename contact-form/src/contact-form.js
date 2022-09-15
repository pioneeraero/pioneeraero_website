import React from "react";

const encode = (data) => {
	return Object.keys(data)
		.map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
		.join("&");
};

class ContactForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {name: "", email: "", subject: "", message: "", success: false, failure: false};
	}

	handleSubmit = (e) => {
		fetch("/", {
			method: "POST",
			headers: {"Content-Type": "application/x-www-form-urlencoded"},
			body: encode({"form-name": "contact", ...this.state})
		})
			.then(() =>
				this.setState({
					name: "",
					email: "",
					subject: "",
					message: "",
					success: true,
					failure: false
				})
			)
			.catch((error) => this.setState({success: false, failure: true}));

		e.preventDefault();
	};

	handleChange = (e) => this.setState({[e.target.name]: e.target.value});

	render() {
		const {name, email, subject, message, success, failure} = this.state;
		return (
			<form name="contact" onSubmit={this.handleSubmit} data-netlify="true" data-netlify-recaptcha="true" netlify-honeypot="bots-r-us">
				<div className="row">
					{success && <div className="animate__animated animate__fadeInDown contact-success">We have received your message.</div>}
					{failure && <div className="animate__animated animate__fadeInDown contact-failure">An error occurred.</div>}
					<div className="col-md-6 col-sm-12">
						<div className="block">
							<input type="hidden" name="form-name" value="contact" />
							<div className="form-group" id="bots-r-us">
								<input type="text" className="form-control" placeholder="Do Not Fill" name="bots-r-us" />
							</div>
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Your Name" htmlFor="name" name="name" value={name} onChange={this.handleChange} required />
							</div>
							<div className="form-group">
								<input type="email" className="form-control" placeholder="Email Address" htmlFor="email" name="email" value={email} onChange={this.handleChange} required />
							</div>
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Subject" htmlFor="subject" name="subject" value={subject} onChange={this.handleChange} required />
							</div>
						</div>
					</div>
					<div className="col-md-6 col-sm-12">
						<div className="block">
							<div className="form-group-2">
								<textarea className="form-control" placeholder="Your Message" htmlFor="message" name="message" value={message} onChange={this.handleChange} required></textarea>
							</div>
							<div type="submit" className="captcha" data-netlify-recaptcha="true"></div>
							<button className="btn btn-default g-recaptcha" data-sitekey="reCAPTCHA_site_key" data-callback="onSubmit" data-action="submit">
								Send Message
							</button>
						</div>
					</div>
				</div>
			</form>
		);
	}
}

export default ContactForm;
