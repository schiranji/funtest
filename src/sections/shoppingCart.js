import React from "react"
import "./cart.scss"

export const Cart = (props) => {
    return (

        <main className="flex-shrink-0" role="main">
            <div className="global-alerts-container">
                <div className="global-alert alert alert-danger" id="globalErrorMessage" style={{ display: 'none' }} />
                <div className="global-alert alert alert-success hidden-initially" id="globalSuccessMessage" style={{ display: 'none' }} />
            </div>
            <div className="modal fade" tabIndex={-1} role="dialog" id="sponsorModal">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Sponsorship Packages</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">×</button>
                        </div>
                        <div className="modal-body">
                            {/* ngRepeat: sponsorCategory in event.sponsorCategories */}<div className="sponsor-category-listing ng-scope" ng-repeat="sponsorCategory in event.sponsorCategories">
                                <div className="listing">
                                    <p className="lead ng-binding" ng-bind="sponsorCategory.name">Platinum</p>
                                    <div className="listing-pricing">
                                        <div className="prices">
                                            <p className="listing-price">Price: $ 100</p>
                                            <p className="sale-price">Sale Price: $ 10</p>
                                        </div>
                                        <input className="quantity-field" name="sponsorQuantity" type="number" onchange="recalcSponsorTotal()" placeholder="Quantity" />
                                    </div>
                                </div>
                            </div>{/* end ngRepeat: sponsorCategory in event.sponsorCategories */}<div className="sponsor-category-listing ng-scope" ng-repeat="sponsorCategory in event.sponsorCategories">
                                <div className="listing">
                                    <p className="lead ng-binding" ng-bind="sponsorCategory.name">Diamond Sponsorship</p>
                                    <div className="listing-pricing">
                                        <div className="prices">
                                            <p className="listing-price">Price: $ 50</p>
                                            <p className="sale-price">Sale Price: $ 5</p>
                                        </div>
                                        <input className="quantity-field" name="sponsorQuantity" type="number" onchange="recalcSponsorTotal()" placeholder="Quantity" />
                                    </div>
                                </div>
                            </div>{/* end ngRepeat: sponsorCategory in event.sponsorCategories */}
                            <div id="sponsorsErrorMessage" />
                        </div>
                        <div className="modal-footer">
                            <p className="lead" id="sponsorsTotal">Total: $0</p>
                            <button className="btn btn-action" type="submit" ng-click="addSponsorsToCart()" style={{ borderColor: 'rgb(204, 204, 204)', backgroundColor: 'rgb(255, 255, 255)' }}>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" tabIndex={-1} role="dialog" id="boothModal">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Available Booth Spaces</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">×</button>
                        </div>
                        <div className="modal-body">
                            {/* ngRepeat: boothCategory in event.boothCategories */}<div className="booth-category-listing ng-scope" ng-repeat="boothCategory in event.boothCategories">
                                <div className="listing">
                                    <p className="lead ng-binding" ng-bind="boothCategory.name">Clothing</p>
                                    <div className="listing-pricing">
                                        <div className="prices">
                                            <p className="listing-price">Price: $200</p>
                                            <p className="sale-price">Sale Price: $50</p>
                                        </div>
                                        <input className="quantity-field" type="number" onchange="recalcBoothTotal()" placeholder="Quantity" name="boothQuantity" />
                                    </div>
                                </div>
                            </div>{/* end ngRepeat: boothCategory in event.boothCategories */}<div className="booth-category-listing ng-scope" ng-repeat="boothCategory in event.boothCategories">
                                <div className="listing">
                                    <p className="lead ng-binding" ng-bind="boothCategory.name">Charity</p>
                                    <div className="listing-pricing">
                                        <div className="prices">
                                            <p className="listing-price">Price: $10</p>
                                            <p className="sale-price">Sale Price: $5</p>
                                        </div>
                                        <input className="quantity-field" type="number" onchange="recalcBoothTotal()" placeholder="Quantity" name="boothQuantity" />
                                    </div>
                                </div>
                            </div>{/* end ngRepeat: boothCategory in event.boothCategories */}
                            <div id="boothsErrorMessage" />
                        </div>
                        <div className="modal-footer">
                            <p className="lead" id="boothsTotal">Total: $0</p>
                            <button className="btn btn-action" id="boothCheckoutBtn" type="submit" ng-click="addBoothsToCart()" style={{ borderColor: 'rgb(204, 204, 204)', backgroundColor: 'rgb(255, 255, 255)' }}>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="single-event-page">
                <div className="container single-event-detail">
                    <div className="single-event">
                        <div className="row single-header">
                            <div className="col-sm-12">
                                <div className="title">
                                    <div className="title-detail">
                                        <div className="event-tags">
                                            {/* ngIf: event.category1 !== undefined && event.category1 !== '' && event.category1 !== null */}<span className="event-tag ng-scope" data-ng-if="event.category1 !== undefined && event.category1 !== '' && event.category1 !== null"><a data-ng-click="showCategory1($index)" title="Search For Charity" property="category" data-ng-bind="event.category1" aria-label="Open Events for this category" className="ng-binding">CHARITY</a></span>{/* end ngIf: event.category1 !== undefined && event.category1 !== '' && event.category1 !== null */}
                                            {/* ngIf: event.category2 !== undefined && event.category2 !== '' && event.category2 !== null */}
                                            {/* ngIf: event.category3 !== undefined && event.category3 !== '' && event.category3 !== null */}
                                        </div>
                                        <h1 className="single-event-title ng-binding" data-ng-bind="event.name">Ticketed Event</h1>
                                    </div>
                                    <div className="top-actions">
                                        <div className="action-group">
                                            <button className="btn btn-action-outline like-button" data-ng-click="likeEvent()" style={{ borderColor: 'rgb(204, 204, 204)', backgroundColor: 'rgb(255, 255, 255)' }}>
                                                <svg className="heart-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 378.94 378.94" xmlSpace="preserve">
                                                    <g>
                                                        <path d="M348.151,54.514c-19.883-19.884-46.315-30.826-74.435-30.826c-28.124,0-54.559,10.942-74.449,30.826l-9.798,9.8l-9.798-9.8 c-19.884-19.884-46.325-30.826-74.443-30.826c-28.117,0-54.56,10.942-74.442,30.826c-41.049,41.053-41.049,107.848,0,148.885 l147.09,147.091c2.405,2.414,5.399,3.892,8.527,4.461c1.049,0.207,2.104,0.303,3.161,0.303c4.161,0,8.329-1.587,11.498-4.764 l147.09-147.091C389.203,162.362,389.203,95.567,348.151,54.514z M325.155,180.404L189.47,316.091L53.782,180.404 c-28.368-28.364-28.368-74.514,0-102.893c13.741-13.739,32.017-21.296,51.446-21.296c19.431,0,37.702,7.557,51.438,21.296 l21.305,21.312c6.107,6.098,16.897,6.098,23.003,0l21.297-21.312c13.737-13.739,32.009-21.296,51.446-21.296 c19.431,0,37.701,7.557,51.438,21.296C353.526,105.89,353.526,152.039,325.155,180.404z" />
                                                    </g>
                                                </svg><span className="event-likes-counter ng-binding" data-ng-bind="event.likes" /> </button>
                                            <div className="dropdown">
                                                <button className="btn btn-action-outline" id="addToCalendar" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add To Calendar</button>
                                                <div className="dropdown-menu" id="addToCalendarMenu" aria-labelledby="addToCalendar" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="address-and-calendar">
                                    <div className="address" data-ng-show="event.address1 !== undefined && event.address1 !== null && event.address1 !== ''">
                                        <div className="ui-icon">
                                            <i className="fas fa-map-marked-alt" aria-hidden="true" />
                                        </div>
                                        <div className="details">
                                            <p className="lead ng-binding" data-ng-bind="event.locationName">Lawler Middle School</p>
                                            <p data-ng-bind="event.address1" className="ng-binding">12921 Rolater Rd</p>
                                            <p data-ng-bind="event.cityStateZip" className="ng-binding">Frisco, TX - 75035</p>
                                        </div>
                                    </div>
                                    <div className="calendar">
                                        <div className="event-date-calendar d-flex flex-column">
                                            <div className="cal-graphic d-flex flex-column">
                                                <span className="cal-header ng-binding" data-ng-bind="event.startDateTime | date:'EEE' : 'UTC'">Fri</span>
                                                <span className="cal-date ng-binding" data-ng-bind="event.startDateTime | date:'d' : 'UTC'">25</span>
                                                <span className="cal-header ng-binding" data-ng-bind="event.startDateTime | date:'MMMM' : 'UTC'">December</span>
                                            </div>
                                            <span className="cal-time ng-binding" data-ng-bind="event.startDateTime | date:'hh:mma' : 'UTC'">10:00PM</span>
                                            <span className="cal-time ng-binding" data-ng-bind="event.timezone" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span className="dashed-decoration-dark" />
                        <div className="row event-description-container">
                            <div className="col-md-8 event-description">
                                <div className="description-section">
                                    <img className="img-fluid primary-image" alt="Ticketed Event" data-ng-src="https://s3.us-west-2.amazonaws.com/funzippy.groupevents/5fe29af256c6373359a93826/summary/raceBanner-ljNYI3eC-bFHZId.jpg" src="https://s3.us-west-2.amazonaws.com/funzippy.groupevents/5fe29af256c6373359a93826/summary/raceBanner-ljNYI3eC-bFHZId.jpg" />
                                    <div id="eventDescription"><p>Ticketed Event for Cultural visit</p></div>
                                </div>
                                <div className="description-section" id="participantsDetails" style={{ display: 'block' }}>
                                    <h3>Speakers</h3>
                                    <div className="card speakers-container">
                                        <ul className="list-group list-group-flush participants">
                                            {/* ngRepeat: participant in event.participants */}<li className="list-group-item participant d-flex flex-row ng-scope" data-ng-repeat="participant in event.participants">
                                                <div className="participant-profile">
                                                    <img className="img-fluid img-circle" src="/images/user.png" />
                                                </div>
                                                <div className="participant-info flex-1">
                                                    <p className="name lead ng-binding" data-ng-bind="participant.firstName + ' ' + participant.lastName">Sirivennela Shastry</p>
                                                    <a className="website ng-binding" data-ng-bind="participant.referenceUrl" />
                                                </div> </li>{/* end ngRepeat: participant in event.participants */}
                                        </ul>
                                    </div>
                                </div>
                                <div className="description-section sponsorships hidden-initially" id="featuredSponsors">
                                    <h3>Sponsors</h3>
                                </div>
                                <div className="description-section schedule-section hidden-initially" id="scheduleDetails">
                                    <h3>Event Schedule</h3>
                                    <div className="card schedule-container">
                                        <ul className="list-group list-group-flush schedule">
                                            {/* ngRepeat: scheduleItem in event.scheduleItems */}
                                        </ul>
                                    </div>
                                </div>
                                <div className="description-section messages-section hidden-initially" id="broadcastMessages">
                                    <h3>Messages from the Host</h3>
                                    <div className="card messages-container">
                                        <ul className="list-group list-group-flush">
                                            {/* ngRepeat: message in event.broadcastMessages */}
                                        </ul>
                                    </div>
                                </div>
                                <div className="description-section map-row" id="map_canvas" data-ng-show="event.address1 !== undefined && event.address1 !== null && event.address1 !== ''" />
                            </div>
                            <div className="col-md-4 event-description-sidebar">
                                <div className="sidebar-section hidden-initially" id="liveLink">
                                    <h4>This event is Live</h4>
                                    <div className="live-content">
                                        <a className="btn btn-action" aria-label="Watch live">Watch Live</a>
                                    </div>
                                    <span className="dashed-decoration-dark" />
                                </div>
                                <div className="sidebar-section hidden-initially">
                                    <h4>PRICING</h4>
                                    <p>Free</p>
                                    <span className="dashed-decoration-dark" />
                                </div>
                                <div className="sidebar-section ticketing" id="ticketsDiv" style={{ display: 'block' }}>
                                    <h4>TICKETS</h4>
                                    <div className="ticketErrorMessage alert alert-danger hidden-initially" id="ticketErrorMessage" />
                                    {/* ngRepeat: ticketCategory in event.ticketCategories */}<div className="form-group inline-form-group ng-scope" data-ng-repeat="ticketCategory in event.ticketCategories">
                                        <label className="ticket-category">VIP Veteran<br /><br />$100Sale: $1</label>
                                        <div className="number-selector">
                                            <button className="minus" disabled="disabled" name="ticketMinusBtn" data-ng-click="ticketMinus($index)" data-ng-disabled="ticketCategory.quantity === undefined || ticketCategory.quantity === 0">
                                                <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{ height: '22px', width: '22px', display: 'block', fill: 'currentcolor' }}>
                                                    <rect height={2} rx={1} width={12} x={6} y={11} />
                                                </svg> </button>
                                            <div className="selected-number">
                                                <p name="ticketSelectedNumber" data-ng-model="ticketCategory.quantity" className="ng-pristine ng-untouched ng-valid ng-empty">0</p>
                                            </div>
                                            <button className="plus" data-ng-click="ticketPlus($index)">
                                                <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{ height: '22px', width: '22px', display: 'block', fill: 'currentcolor' }}>
                                                    <rect height={2} rx={1} width={12} x={6} y={11} />
                                                    <rect height={12} rx={1} width={2} x={11} y={6} />
                                                </svg> </button>
                                        </div>
                                    </div>{/* end ngRepeat: ticketCategory in event.ticketCategories */}<div className="form-group inline-form-group ng-scope" data-ng-repeat="ticketCategory in event.ticketCategories">
                                        <label className="ticket-category">General General<br /><br />$1Sale: $9</label>
                                        <div className="number-selector">
                                            <button className="minus" disabled="disabled" name="ticketMinusBtn" data-ng-click="ticketMinus($index)" data-ng-disabled="ticketCategory.quantity === undefined || ticketCategory.quantity === 0">
                                                <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{ height: '22px', width: '22px', display: 'block', fill: 'currentcolor' }}>
                                                    <rect height={2} rx={1} width={12} x={6} y={11} />
                                                </svg> </button>
                                            <div className="selected-number">
                                                <p name="ticketSelectedNumber" data-ng-model="ticketCategory.quantity" className="ng-pristine ng-untouched ng-valid ng-empty">0</p>
                                            </div>
                                            <button className="plus" data-ng-click="ticketPlus($index)">
                                                <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{ height: '22px', width: '22px', display: 'block', fill: 'currentcolor' }}>
                                                    <rect height={2} rx={1} width={12} x={6} y={11} />
                                                    <rect height={12} rx={1} width={2} x={11} y={6} />
                                                </svg> </button>
                                        </div>
                                    </div>{/* end ngRepeat: ticketCategory in event.ticketCategories */}
                                    <div className="form-group inline-form-group">
                                        <label htmlFor="ticketBuyerName">Name</label>
                                        <input id="ticketBuyerName" data-ng-bind="eventUser.firstName" required placeholder="Name" type="text" className="ng-binding" style={{ borderColor: 'rgb(204, 204, 204)', backgroundColor: 'rgb(255, 255, 255)' }} />
                                    </div>
                                    <div className="form-group inline-form-group">
                                        <label htmlFor="ticketBuyerEmail">Email</label>
                                        <input id="ticketBuyerEmail" data-ng-bind="eventUser.emailAddress" required placeholder="Email" type="email" className="ng-binding" style={{ borderColor: 'rgb(204, 204, 204)', backgroundColor: 'rgb(255, 255, 255)' }} />
                                    </div>
                                    <div className="form-group inline-form-group">
                                        <label htmlFor="ticketBuyerPhone">Phone</label>
                                        <input id="ticketBuyerPhone" data-ng-bind="eventUser.phoneNumber" required placeholder="Phone" type="tel" className="ng-binding" style={{ borderColor: 'rgb(204, 204, 204)', backgroundColor: 'rgb(255, 255, 255)' }} />
                                    </div>
                                    <div className="form-group inline-form-group submit-rsvp">
                                        {/* ngIf: event.ticketCategories == null */}
                                        {/* ngIf: event.ticketCategories != null */}<a className="btn btn-action ng-scope" data-ng-if="event.ticketCategories != null" data-ng-click="addToCart()" aria-label="Checkout">Checkout</a>{/* end ngIf: event.ticketCategories != null */}
                                    </div>
                                    <span className="dashed-decoration-dark" />
                                </div>
                                <div className="sidebar-section rsvp-center hidden-initially" id="rsvpDiv">
                                    <h4>RSVP</h4>
                                    <div className="ticketErrorMessage" id="rsvpErrorMessage" />
                                    <div className="form-group inline-form-group">
                                        <label className="ticket-category">Adults</label>
                                        <div className="number-selector">
                                            <button className="minus" id="rsvpAdultMinus" disabled="disabled" data-ng-click="rsvpAdultMinus()" data-ng-disabled="eventUser.rsvpAdultCount == undefined || eventUser.rsvpAdultCount == null || eventUser.rsvpAdultCount == 0" style={{ borderColor: 'rgb(204, 204, 204)', backgroundColor: 'rgb(255, 255, 255)' }}>
                                                <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{ height: '22px', width: '22px', display: 'block', fill: 'currentcolor' }}>
                                                    <rect height={2} rx={1} width={12} x={6} y={11} />
                                                </svg> </button>
                                            <div className="selected-number">
                                                <p id="adultRsvpCount" data-ng-bind="eventUser.rsvpAdultCount" className="ng-binding" />
                                            </div>
                                            <button className="plus" id="rsvpAdultPlus" data-ng-click="rsvpAdultPlus()" style={{ borderColor: 'rgb(204, 204, 204)', backgroundColor: 'rgb(255, 255, 255)' }}>
                                                <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{ height: '22px', width: '22px', display: 'block', fill: 'currentcolor' }}>
                                                    <rect height={2} rx={1} width={12} x={6} y={11} />
                                                    <rect height={12} rx={1} width={2} x={11} y={6} />
                                                </svg> </button>
                                        </div>
                                    </div>
                                    <div className="form-group inline-form-group">
                                        <label className="ticket-category">Kids</label>
                                        <div className="number-selector">
                                            <button className="minus" id="rsvpKidMinus" disabled="disabled" data-ng-click="rsvpKidMinus()" data-ng-disabled="eventUser.rsvpKidCount == undefined || eventUser.rsvpKidCount == null || eventUser.rsvpKidCount == 0" style={{ borderColor: 'rgb(204, 204, 204)', backgroundColor: 'rgb(255, 255, 255)' }}>
                                                <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{ height: '22px', width: '22px', display: 'block', fill: 'currentcolor' }}>
                                                    <rect height={2} rx={1} width={12} x={6} y={11} />
                                                </svg> </button>
                                            <div className="selected-number">
                                                <p id="kidRsvpCount" data-ng-bind="eventUser.rsvpKidCount" className="ng-binding" />
                                            </div>
                                            <button className="plus" id="rsvpKidPlus" data-ng-click="rsvpKidPlus()" style={{ borderColor: 'rgb(204, 204, 204)', backgroundColor: 'rgb(255, 255, 255)' }}>
                                                <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{ height: '22px', width: '22px', display: 'block', fill: 'currentcolor' }}>
                                                    <rect height={2} rx={1} width={12} x={6} y={11} />
                                                    <rect height={12} rx={1} width={2} x={11} y={6} />
                                                </svg> </button>
                                        </div>
                                    </div>
                                    <div className="form-group inline-form-group">
                                        <label htmlFor="rsvpAcceptingName">Name</label>
                                        <input data-ng-bind="eventUser.firstName" name="rsvpAcceptingName" placeholder="Name" required id="rsvpAcceptingName" type="text" className="ng-binding" style={{ borderColor: 'rgb(204, 204, 204)', backgroundColor: 'rgb(255, 255, 255)' }} />
                                    </div>
                                    <div className="form-group inline-form-group">
                                        <label htmlFor="rsvpAcceptingEmail">Email</label>
                                        <input placeholder="Email" required data-ng-bind="eventUser.emailAddress" name="rsvpAcceptingEmail" id="rsvpAcceptingEmail" type="email" className="ng-binding" style={{ borderColor: 'rgb(204, 204, 204)', backgroundColor: 'rgb(255, 255, 255)' }} />
                                    </div>
                                    <div className="form-group inline-form-group">
                                        <label htmlFor="rsvpAcceptingPhone">Phone</label>
                                        <input placeholder="Phone" required data-ng-bind="eventUser.phoneNumber" name="rsvpAcceptingPhone" id="rsvpAcceptingPhone" type="tel" className="ng-binding" style={{ borderColor: 'rgb(204, 204, 204)', backgroundColor: 'rgb(255, 255, 255)' }} />
                                    </div>
                                    <div className="form-group inline-form-group rsvp-chooser">
                                        <div className="text-checkbox-container">
                                            <input type="radio" name="rsvp-status" data-ng-model="eventUser.rsvpStatus" required defaultValue="A" className="ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required" style={{ borderColor: 'rgb(204, 204, 204)', backgroundColor: 'rgb(255, 255, 255)' }} />
                                            <span className="option rounded-pill">Accept</span>
                                        </div>
                                        <div className="text-checkbox-container">
                                            <input type="radio" name="rsvp-status" data-ng-model="eventUser.rsvpStatus" defaultValue="D" className="ng-pristine ng-untouched ng-valid ng-empty" style={{ borderColor: 'rgb(204, 204, 204)', backgroundColor: 'rgb(255, 255, 255)' }} />
                                            <span className="option rounded-pill">Decline</span>
                                        </div>
                                        <div className="text-checkbox-container">
                                            <input type="radio" name="rsvp-status" data-ng-model="eventUser.rsvpStatus" defaultValue="T" className="ng-pristine ng-untouched ng-valid ng-empty" style={{ borderColor: 'rgb(204, 204, 204)', backgroundColor: 'rgb(255, 255, 255)' }} />
                                            <span className="option rounded-pill">Maybe</span>
                                        </div>
                                    </div>
                                    <div className="form-group inline-form-group submit-rsvp">
                                        <a className="btn btn-action" data-ng-click="rsvpEvent()" aria-label="RSVP">RSVP</a>
                                    </div>
                                    <span className="dashed-decoration-dark" />
                                </div>
                                {/* ngIf: event.contacts !== null */}<div className="sidebar-section ng-scope" id="contactsDetails" data-ng-if="event.contacts !== null" style={{ display: 'block' }}>
                                    <h4>CONTACT</h4>
                                    <div className="card speakers-container">
                                        <ul className="list-group list-group-flush participants">
                                            {/* ngRepeat: contact in event.contacts */}<li className="list-group-item contact-info participant ng-scope" data-ng-repeat="contact in event.contacts"><img className="img-fluid img-circle" src="/images/user.png" alt="" />
                                                <div className="contact-details">
                                                    <p className="name"><span data-ng-hide="contact.firstName == null" data-ng-bind="(contact.firstName) + &quot; &quot;" className="ng-binding">Chiranji </span><span data-ng-hide="contact.lastName == null" data-ng-bind="contact.lastName" className="ng-binding">chiranji</span></p>
                                                    <div className="number">
                                                        <a data-ng-hide="contact.phoneNumber == null" data-ng-bind="contact.phoneNumber" href="tel:1455555" className="ng-binding">1455555</a>
                                                    </div>
                                                    <div className="email">
                                                        <a data-ng-hide="contact.emailAddress == null" data-ng-bind="contact.emailAddress" href="mailto:test@test.com" className="ng-binding">test@test.com</a>
                                                    </div>
                                                </div> </li>{/* end ngRepeat: contact in event.contacts */}
                                        </ul>
                                    </div>
                                    <span className="dashed-decoration-dark" />
                                </div>{/* end ngIf: event.contacts !== null */}
                                <div className="sidebar-section" id="sponsorsDiv" style={{ display: 'block' }}>
                                    <h4>SPONSORSHIP</h4>
                                    <p>This event is looking for sponsors</p>
                                    <button className="btn btn-action" data-toggle="modal" data-target="#sponsorModal" data-backdrop="static" style={{ borderColor: 'rgb(204, 204, 204)', backgroundColor: 'rgb(255, 255, 255)' }}>See Sponsorship Packages</button>
                                    <span className="dashed-decoration-dark" />
                                </div>
                                <div className="sidebar-section" id="boothsDiv" style={{ display: 'block' }}>
                                    <h4>BOOTH SPACE</h4>
                                    <p>Buy a booth today</p>
                                    <button className="btn btn-action" data-toggle="modal" data-target="#boothModal" data-backdrop="static" style={{ borderColor: 'rgb(204, 204, 204)', backgroundColor: 'rgb(255, 255, 255)' }}>See Booths</button>
                                    <span className="dashed-decoration-dark" />
                                </div>
                                <div className="sidebar-section hidden-initially" id="transportDetails" style={{ display: 'none' }}>
                                    <h4>DIRECTIONS</h4>
                                    <p data-ng-bind="event.transport" className="ng-binding" />
                                    <span className="dashed-decoration-dark" />
                                </div>
                                <div className="sidebar-section hidden-initially" id="parkingDetails" style={{ display: 'none' }}>
                                    <h4>PARKING</h4>
                                    <p data-ng-bind="event.parking" className="ng-binding" />
                                    <span className="dashed-decoration-dark" />
                                </div>
                                <div className="sidebar-section hidden-initially" id="placesToStayDetails" style={{ display: 'none' }}>
                                    <h4>PLACES TO STAY</h4>
                                    <p data-ng-bind="event.placesToStay" className="ng-binding" />
                                </div>
                            </div>
                        </div>
                        <div className="row gift-registry hidden-initially" id="giftItemsDetails" style={{ display: 'none' }}>
                            <div className="col-sm-12">
                                <h3>Gift Registry</h3>
                            </div>
                            <div className="col-sm-12">
                                <div className="card">
                                    <ul className="list-group list-group-flush gift-registry-list">
                                        {/* ngRepeat: giftItem in event.giftItems */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row hidden-initially" id="potluckItemsDetails" style={{ display: 'none' }}>
                            <div className="col-sm-12">
                                <h3>Potluck Items</h3>
                                <p className="lead">Sign up for an item below</p>
                            </div>
                            <div className="ticketErrorMessage alert alert-danger hidden-initially" id="potluckErrorMessage" />
                            <div className="col-sm-12">
                                <div className="card">
                                    <ul className="list-group list-group-flush potluck-list">
                                        {/* ngRepeat: potluckItem in event.potluckItems */}
                                        <li className="list-group-item potluck-signup">
                                            <div className="form-group">
                                                <input className="btn btn-action" type="button" name="potluckSubmit" defaultValue="Sign up for potluck" data-ng-click="potluckItemsClaimed()" />
                                            </div> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                       <div className="table100 ver3 m-b-110">
        <div className="table100-head">
          <table>
            <thead>
              <tr className="row100 head">
                <th className="cell100 column1">Name</th>
                <th className="cell100 column2">Start Date</th>
                <th className="cell100 column3">Start Time</th>
                <th className="cell100 column4">Duration</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="table100-body js-pscroll ps ps--active-y">
          <table>
            <tbody>
              
              <tr className="row100 body">
                <td className="cell100 column1">Yoga for Divas</td>
                <td className="cell100 column2">Yoga</td>
                <td className="cell100 column3">9:00 AM - 11:00 AM</td>
                <td className="cell100 column4">Donna Wilson</td>
              </tr>
              <tr className="row100 body">
                <td className="cell100 column1">Virtual Cycle</td>
                <td className="cell100 column2">Gym</td>
                <td className="cell100 column3">8:00 AM - 9:00 AM</td>
                <td className="cell100 column4">Randy Porter</td>
              </tr>
            </tbody>
          </table>
          <div className="ps__rail-x" style={{left: '0px', bottom: '0px'}}><div className="ps__thumb-x" tabIndex={0} style={{left: '0px', width: '0px'}} /></div><div className="ps__rail-y" style={{top: '0px', right: '5px'}}><div className="ps__thumb-y" tabIndex={0} style={{top: '0px'}} /></div></div>
      </div>
                        <div className="row hidden-initially" id="volunteerSignupDiv">
                            <div className="col-sm-12">
                                <h3>Volunteer Slots</h3>
                                <p className="lead">Sign up for any tasks below</p>
                            </div>
                            <div className="col-sm-12">
                                <div className="card">
                                    <ul className="list-group list-group-flush volunteer-list">
                                        <li className="list-group-item potluck-list-item">
                                            <div className="item-details">
                                                <p className="item-name">Task for Volunteer</p>
                                                <p className="item-description" />
                                                <p className="item-time" />
                                            </div>
                                            <div className="potluck-item-signup">
                                                <div className="form-group">
                                                    <div className="text-checkbox-container">
                                                        <input type="checkbox" name="volunteerItem" style={{ borderColor: 'rgb(204, 204, 204)', backgroundColor: 'rgb(255, 255, 255)' }} />
                                                        <span className="option rounded icon">
                                                            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px">
                                                                <path fillRule="evenodd" d="M 22.59375 3.5 L 8.0625 18.1875 L 1.40625 11.5625 L 0 13 L 8.0625 21 L 24 4.9375 Z" />
                                                            </svg></span>
                                                    </div>
                                                </div>
                                            </div> </li>
                                        <li className="list-group-item potluck-signup">
                                            <div className="form-group">
                                                <input className="btn btn-action" type="button" name="potluckSubmit" defaultValue="Submit" />
                                            </div> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row hidden-initially" id="picturesGallery" style={{ display: 'none' }}>
                            <div className="gallery">
                                <div className="col-sm-12">
                                    <div className="carousel slide" id="eventMediaCarousel" data-interval="false" data-ride="false">
                                        <h3>Event Media</h3>
                                        <div className="carousel-inner">
                                            <a className="carousel-control-prev" href="#eventMediaCarousel" role="button" data-slide="prev">Previous</a>
                                            <a className="carousel-control-next" href="#eventMediaCarousel" role="button" data-slide="next">Next</a>
                                            {/* ngRepeat: url in event.media */}
                                        </div>
                                        <div className="preview-slider-container">
                                            <div className="preview-slider">
                                                {/* ngRepeat: url in event.media */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row social-section event-footer-section">
                            <h4>Share event</h4>
                            <div className="col-sm-12 social-icons">
                                <a id="fbshare" href="#">Facebook</a>
                                <a id="twittershare" href="#">Twitter</a>
                            </div>
                        </div>
                        <div className="row search-tags event-footer-section">
                            <h4>Tags</h4>
                            <div className="col-sm-12 tags-container">
                                {/* ngRepeat: searchTag in event.searchTags track by $index */}<div className="search-tag ng-scope" data-ng-repeat="searchTag in event.searchTags track by $index">
                                    <p className="ng-binding">charity event</p>
                                </div>{/* end ngRepeat: searchTag in event.searchTags track by $index */}
                            </div>
                        </div>
                        <div className="row single-footer single-event-footer">
                            <div className="col-sm-12">
                                <h3 data-ng-bind="event.name" className="ng-binding">Ticketed Event</h3>
                                <p className="lead ng-binding" data-ng-bind="event.locationName">Lawler Middle School</p>
                                <p data-ng-bind="event.address1" className="ng-binding">12921 Rolater Rd</p>
                                <p data-ng-bind="event.cityStateZip" className="ng-binding">Frisco, TX - 75035</p>
                                <p className="ng-binding">December 25, 2020</p>
                            </div>
                        </div>
                        {/* ngIf: event.createdBy != '' */}
                    </div>
                </div>
            </div>
        </main>
    );
}