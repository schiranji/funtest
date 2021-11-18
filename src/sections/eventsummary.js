import React from "react"
import { Table } from "baseui/table-semantic";
export const Summary = (props) => {

    return (

        <div className="single-event-page">
            <div className="container single-event-detail">
                <div className="single-event">
                    <div className="row single-header">
                        <div className="col-sm-12">
                            <div className="title">
                                <div className="title-detail">
                                    <div className="event-tags">
                                        <span className="event-tag" data-ng-show="event.category1"><a data-ng-click="showCategory1($index)" title="Search For Music" property="category" data-ng-bind="event.category1" aria-label="Open Events for this category" className="ng-binding">Music</a></span>
                                        <span className="event-tag ng-hide" data-ng-show="event.category2"><a data-ng-click="showCategory2($index)" title="Search For " data-ng-bind="event.category2" aria-label="Open Events for this category" className="ng-binding" /></span>
                                        <span className="event-tag ng-hide" data-ng-show="event.category3"><a data-ng-click="showCategory3($index)" title="Search For " data-ng-bind="event.category3" aria-label="Open Events for this category" className="ng-binding" /></span>
                                    </div>
                                    <h1 className="single-event-title ng-binding" data-ng-bind="event.name">Carnatic Music Concert 2020</h1>
                                </div>
                                <div className="top-actions">
                                    <div className="action-group">
                                        <button className="btn btn-action-outline like-button" data-ng-click="likeEvent()" aria-label="Like">
                                            <svg className="heart-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 378.94 378.94" xmlSpace="preserve">
                                                <g>
                                                    <path d="M348.151,54.514c-19.883-19.884-46.315-30.826-74.435-30.826c-28.124,0-54.559,10.942-74.449,30.826l-9.798,9.8l-9.798-9.8 c-19.884-19.884-46.325-30.826-74.443-30.826c-28.117,0-54.56,10.942-74.442,30.826c-41.049,41.053-41.049,107.848,0,148.885 l147.09,147.091c2.405,2.414,5.399,3.892,8.527,4.461c1.049,0.207,2.104,0.303,3.161,0.303c4.161,0,8.329-1.587,11.498-4.764 l147.09-147.091C389.203,162.362,389.203,95.567,348.151,54.514z M325.155,180.404L189.47,316.091L53.782,180.404 c-28.368-28.364-28.368-74.514,0-102.893c13.741-13.739,32.017-21.296,51.446-21.296c19.431,0,37.702,7.557,51.438,21.296 l21.305,21.312c6.107,6.098,16.897,6.098,23.003,0l21.297-21.312c13.737-13.739,32.009-21.296,51.446-21.296 c19.431,0,37.701,7.557,51.438,21.296C353.526,105.89,353.526,152.039,325.155,180.404z" />
                                                </g>
                                            </svg>{/* ngIf: event.likes> 0 */} </button>
                                        <div className="dropdown">
                                            <button className="btn btn-action-outline" id="addToCalendar" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add to Calendar</button>
                                            <div className="dropdown-menu Event" id="addToCalendarMenu" aria-labelledby="addToCalendar"><a className="dropdown-item" target="_blank" href="https://www.google.com/calendar/render?action=TEMPLATE&text=Carnatic%20Music%20Concert%202020&dates=20200627T180000/20200627T200000&details=%3Cp%3EHello%20Please%20join%20for%20Carnatic%20Music%20concert%3C/p%3E%3Cbr%3E%3Cp%3Ehttps://youtu.be/IfDpC3KZfRg%3C/p%3E%3Cbr%3E%3Cp%3E%3Ca%20href='https://youtu.be/IfDpC3KZfRg'%20target='_self'%3ESample%20url%3C/a%3E%3C/p%3E&location=12921%20Rolater%20Rd,%20Frisco,%20TX%20-%2075035&sprop=&sprop=name:"><i className="fab fa-google" aria-hidden="true" />Google Calendar</a><a className="dropdown-item" target="_blank" href="http://calendar.yahoo.com/?v=60&view=d&type=20&title=Carnatic%20Music%20Concert%202020&st=20200627T180000&dur=0200&desc=%3Cp%3EHello%20Please%20join%20for%20Carnatic%20Music%20concert%3C/p%3E%3Cbr%3E%3Cp%3Ehttps://youtu.be/IfDpC3KZfRg%3C/p%3E%3Cbr%3E%3Cp%3E%3Ca%20href='https://youtu.be/IfDpC3KZfRg'%20target='_self'%3ESample%20url%3C/a%3E%3C/p%3E&in_loc=12921%20Rolater%20Rd,%20Frisco,%20TX%20-%2075035"><i className="fab fa-yahoo" aria-hidden="true" />Yahoo! Calendar</a><a className="icon-ical dropdown-item" target="_blank" href="data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:https://funzippy.com/event/5ef42caf3bbd7f5399c08dd1/hGWIHg3gFpo%0ADTSTART:20200627T180000%0ADTEND:20200627T200000%0ASUMMARY:Carnatic%20Music%20Concert%202020%0ADESCRIPTION:%3Cp%3EHello%20Please%20join%20for%20Carnatic%20Music%20concert%3C/p%3E%3Cbr%3E%3Cp%3Ehttps://youtu.be/IfDpC3KZfRg%3C/p%3E%3Cbr%3E%3Cp%3E%3Ca%20href='https://youtu.be/IfDpC3KZfRg'%20target='_self'%3ESample%20url%3C/a%3E%3C/p%3E%0ALOCATION:12921%20Rolater%20Rd,%20Frisco,%20TX%20-%2075035%0AEND:VEVENT%0AEND:VCALENDAR"><i className="fab fa-apple" aria-hidden="true" />iCal Calendar</a><a className="icon-outlook dropdown-item" target="_blank" href="data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:https://funzippy.com/event/5ef42caf3bbd7f5399c08dd1/hGWIHg3gFpo%0ADTSTART:20200627T180000%0ADTEND:20200627T200000%0ASUMMARY:Carnatic%20Music%20Concert%202020%0ADESCRIPTION:%3Cp%3EHello%20Please%20join%20for%20Carnatic%20Music%20concert%3C/p%3E%3Cbr%3E%3Cp%3Ehttps://youtu.be/IfDpC3KZfRg%3C/p%3E%3Cbr%3E%3Cp%3E%3Ca%20href='https://youtu.be/IfDpC3KZfRg'%20target='_self'%3ESample%20url%3C/a%3E%3C/p%3E%0ALOCATION:12921%20Rolater%20Rd,%20Frisco,%20TX%20-%2075035%0AEND:VEVENT%0AEND:VCALENDAR"><i className="fab fa-microsoft" aria-hidden="true" />Outlook Calendar</a></div>
                                        </div>
                                        <button className="btn btn-action-outline like-button ng-hide" data-ng-show="event.liveVideoUrl" data-ng-click="watchLive()">Watch Live</button>
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
                                            <span className="cal-header ng-binding" data-ng-bind="event.startDateTime | date:'EEE' : 'UTC'">Sat</span>
                                            <span className="cal-date ng-binding" data-ng-bind="event.startDateTime | date:'d' : 'UTC'">27</span>
                                            <span className="cal-header ng-binding" data-ng-bind="event.startDateTime | date:'MMMM' : 'UTC'">June</span>
                                        </div>
                                        <span className="cal-time ng-binding" data-ng-bind="event.startDateTime | date:'hh:mma' : 'UTC'">06:00PM</span>
                                        <span className="cal-time ng-binding" data-ng-bind="event.timezone">America/Chicago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span className="dashed-decoration-dark" />
                    <div className="row event-description-container">
                        <div className="col-md-8 event-description">
                            <div className="description-section">
                                <img className="img-fluid primary-image" alt="Carnatic Music Concert 2020" />
                                <div id="eventDescription"><p>Hello Please join for Carnatic Music concert</p><br /><p>https://youtu.be/IfDpC3KZfRg</p><br /><p><a href="https://youtu.be/IfDpC3KZfRg" target="_self">Sample url</a></p></div>
                            </div>
                            <div className="description-section hidden-initially" id="participantsDetails" ng-show="event.participants" style={{ display: 'none' }}>
                                <h3>Speakers</h3>
                                <div className="card speakers-container">
                                    <ul className="list-group list-group-flush participants">
                                        {/* ngRepeat: participant in event.participants */}
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
                                        {/* ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">07:15AM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">name1</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc 2</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc2</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">07:15AM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">07:15AM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">67</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">07:30AM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">Test 2</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">des 2</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">Part 2</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">07:30AM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">07:30AM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">55665</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">12:00PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">hgkh</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">tg]i</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc4</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">12:00PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">12:00PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">3</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">12:00PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">huk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc6</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">12:00PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">12:00PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">7</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">12:15PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">hjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">de</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">patr</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">12:15PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">12:15PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">7</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:30PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:30PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ahsjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc5</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">77</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">hasjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc7</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">44</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">hasjk</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">desc5</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc7</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">44</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">tuy</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">yt</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc55</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">4</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">tuy</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">yt</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc55</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">4</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ert</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">ert</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">ert</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">333</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ert</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">ert</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">ert</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">333</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ert</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">ert</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">ert</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">333</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ert</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">ert</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">ert</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">333</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ert</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">ert</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">ert</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">333</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">ert</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">ert</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">ert</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">01:45PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">01:45PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">333</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">02:00PM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">test</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">test56</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">partc56</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">02:00PM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">02:00PM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">56</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">03:15AM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">test</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">test desc</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">test partc</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">03:15AM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">05:00AM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">6</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}<li className="list-group-item schedule-item ng-scope" data-ng-repeat="scheduleItem in event.scheduleItems">
                                            <div className="schedule-item-date">
                                                <p data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">04:45AM</p>
                                            </div>
                                            <div className="schedule-description">
                                                <p className="schedule-item-name ng-binding" data-ng-bind="scheduleItem.name">Arun</p>
                                                <p className="schedule-item-description ng-binding" data-ng-bind="scheduleItem.description">ew</p>
                                                <p className="schedule-item-participants ng-binding" data-ng-bind="scheduleItem.participants">we</p>
                                            </div>
                                            <div className="schedule-timing">
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.startDateTime | date:'hh:mma' : 'UTC' + ' '" className="ng-binding">04:45AM</span><span>- </span><span data-ng-bind="scheduleItem.endDateTime | date:'hh:mma' : 'UTC'" className="ng-binding">04:45AM</span></p>
                                                <p className="schedule-item-time"><span data-ng-bind="scheduleItem.duration" className="ng-binding">32</span></p>
                                            </div> </li>{/* end ngRepeat: scheduleItem in event.scheduleItems */}
                                    </ul>
                                </div>
                            </div>
                    
                            <div className="description-section messages-section hidden-initially" id="broadcastMessages" style={{ display: 'none' }}>
                                <h3>Messages from the Host</h3>
                                <div className="card messages-container">
                                    <ul className="list-group list-group-flush">
                                        {/* ngRepeat: message in event.broadcastMessages */}
                                    </ul>
                                </div>
                            </div>
                            <div className="description-section map-row" id="map_canvas" data-ng-show="event.address1 !== undefined && event.address1 !== null && event.address1 !== ''" style={{ position: 'relative', overflow: 'hidden' }}><div style={{ height: '100%', width: '100%', position: 'absolute', top: '0px', left: '0px', backgroundColor: 'rgb(229, 227, 223)' }}><div className="gm-style" style={{ position: 'absolute', zIndex: 0, left: '0px', top: '0px', height: '100%', width: '100%', padding: '0px', borderWidth: '0px', margin: '0px' }}><div><button draggable="false" aria-label="Keyboard shortcuts" title="Keyboard shortcuts" type="button" style={{ background: 'none transparent', display: 'block', border: 'none', margin: '0px', padding: '0px', textTransform: 'none', appearance: 'none', position: 'absolute', cursor: 'pointer', userSelect: 'none', zIndex: 1000002, left: '-100000px', top: '-100000px' }} /></div><div tabIndex={0} aria-label="Map" aria-roledescription="map" role="group" style={{ position: 'absolute', zIndex: 0, left: '0px', top: '0px', height: '100%', width: '100%', padding: '0px', borderWidth: '0px', margin: '0px', cursor: 'url("https://maps.gstatic.com/mapfiles/openhand_8_8.cur"), default', touchAction: 'pan-x pan-y' }}><div style={{ zIndex: 1, position: 'absolute', left: '50%', top: '50%', width: '100%', transform: 'translate(0px, 0px)' }}><div style={{ position: 'absolute', left: '0px', top: '0px', zIndex: 100, width: '100%' }}><div style={{ position: 'absolute', left: '0px', top: '0px', zIndex: 0 }}><div style={{ position: 'absolute', zIndex: 983, transform: 'matrix(1, 0, 0, 1, -89, -93)' }}><div style={{ position: 'absolute', left: '0px', top: '0px', width: '256px', height: '256px' }}><div style={{ width: '256px', height: '256px' }} /></div><div style={{ position: 'absolute', left: '-256px', top: '0px', width: '256px', height: '256px' }}><div style={{ width: '256px', height: '256px' }} /></div><div style={{ position: 'absolute', left: '-256px', top: '-256px', width: '256px', height: '256px' }}><div style={{ width: '256px', height: '256px' }} /></div><div style={{ position: 'absolute', left: '0px', top: '-256px', width: '256px', height: '256px' }}><div style={{ width: '256px', height: '256px' }} /></div><div style={{ position: 'absolute', left: '256px', top: '-256px', width: '256px', height: '256px' }}><div style={{ width: '256px', height: '256px' }} /></div><div style={{ position: 'absolute', left: '256px', top: '0px', width: '256px', height: '256px' }}><div style={{ width: '256px', height: '256px' }} /></div><div style={{ position: 'absolute', left: '256px', top: '256px', width: '256px', height: '256px' }}><div style={{ width: '256px', height: '256px' }} /></div><div style={{ position: 'absolute', left: '0px', top: '256px', width: '256px', height: '256px' }}><div style={{ width: '256px', height: '256px' }} /></div><div style={{ position: 'absolute', left: '-256px', top: '256px', width: '256px', height: '256px' }}><div style={{ width: '256px', height: '256px' }} /></div></div></div></div><div style={{ position: 'absolute', left: '0px', top: '0px', zIndex: 101, width: '100%' }} /><div style={{ position: 'absolute', left: '0px', top: '0px', zIndex: 102, width: '100%' }} /><div style={{ position: 'absolute', left: '0px', top: '0px', zIndex: 103, width: '100%' }}><div style={{ position: 'absolute', left: '0px', top: '0px', zIndex: -1 }}><div style={{ position: 'absolute', zIndex: 983, transform: 'matrix(1, 0, 0, 1, -89, -93)' }}><div style={{ width: '256px', height: '256px', overflow: 'hidden', position: 'absolute', left: '0px', top: '0px' }} /><div style={{ width: '256px', height: '256px', overflow: 'hidden', position: 'absolute', left: '-256px', top: '0px' }} /><div style={{ width: '256px', height: '256px', overflow: 'hidden', position: 'absolute', left: '-256px', top: '-256px' }} /><div style={{ width: '256px', height: '256px', overflow: 'hidden', position: 'absolute', left: '0px', top: '-256px' }} /><div style={{ width: '256px', height: '256px', overflow: 'hidden', position: 'absolute', left: '256px', top: '-256px' }} /><div style={{ width: '256px', height: '256px', overflow: 'hidden', position: 'absolute', left: '256px', top: '0px' }} /><div style={{ width: '256px', height: '256px', overflow: 'hidden', position: 'absolute', left: '256px', top: '256px' }} /><div style={{ width: '256px', height: '256px', overflow: 'hidden', position: 'absolute', left: '0px', top: '256px' }} /><div style={{ width: '256px', height: '256px', overflow: 'hidden', position: 'absolute', left: '-256px', top: '256px' }} /></div></div><div style={{ width: '27px', height: '43px', overflow: 'hidden', position: 'absolute', left: '-14px', top: '-43px', zIndex: 0 }}><img alt="" src="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png" draggable="false" style={{ position: 'absolute', left: '0px', top: '0px', width: '27px', height: '43px', userSelect: 'none', border: '0px', padding: '0px', margin: '0px', maxWidth: 'none' }} /></div></div><div style={{ position: 'absolute', left: '0px', top: '0px', zIndex: 0 }}><div style={{ position: 'absolute', zIndex: 983, transform: 'matrix(1, 0, 0, 1, -89, -93)' }}><div style={{ position: 'absolute', left: '256px', top: '-256px', width: '256px', height: '256px', transition: 'opacity 200ms linear 0s' }}><img draggable="false" alt="" role="presentation" src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i17!2i30305!3i52735!4i256!2m3!1e4!2st!3i581!2m3!1e0!2sr!3i581306170!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sTerrain!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyDr2SAnjIiQ_kHPKfeInTDIodVDl2H_StM&token=57020" style={{ width: '256px', height: '256px', userSelect: 'none', border: '0px', padding: '0px', margin: '0px', maxWidth: 'none' }} /></div><div style={{ position: 'absolute', left: '0px', top: '0px', width: '256px', height: '256px', transition: 'opacity 200ms linear 0s' }}><img draggable="false" alt="" role="presentation" src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i17!2i30304!3i52736!4i256!2m3!1e4!2st!3i581!2m3!1e0!2sr!3i581306194!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sTerrain!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyDr2SAnjIiQ_kHPKfeInTDIodVDl2H_StM&token=85895" style={{ width: '256px', height: '256px', userSelect: 'none', border: '0px', padding: '0px', margin: '0px', maxWidth: 'none' }} /></div><div style={{ position: 'absolute', left: '256px', top: '0px', width: '256px', height: '256px', transition: 'opacity 200ms linear 0s' }}><img draggable="false" alt="" role="presentation" src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i17!2i30305!3i52736!4i256!2m3!1e4!2st!3i581!2m3!1e0!2sr!3i581306170!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sTerrain!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyDr2SAnjIiQ_kHPKfeInTDIodVDl2H_StM&token=54087" style={{ width: '256px', height: '256px', userSelect: 'none', border: '0px', padding: '0px', margin: '0px', maxWidth: 'none' }} /></div><div style={{ position: 'absolute', left: '0px', top: '-256px', width: '256px', height: '256px', transition: 'opacity 200ms linear 0s' }}><img draggable="false" alt="" role="presentation" src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i17!2i30304!3i52735!4i256!2m3!1e4!2st!3i581!2m3!1e0!2sr!3i581306194!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sTerrain!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyDr2SAnjIiQ_kHPKfeInTDIodVDl2H_StM&token=88828" style={{ width: '256px', height: '256px', userSelect: 'none', border: '0px', padding: '0px', margin: '0px', maxWidth: 'none' }} /></div><div style={{ position: 'absolute', left: '-256px', top: '0px', width: '256px', height: '256px', transition: 'opacity 200ms linear 0s' }}><img draggable="false" alt="" role="presentation" src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i17!2i30303!3i52736!4i256!2m3!1e4!2st!3i581!2m3!1e0!2sr!3i581306194!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sTerrain!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyDr2SAnjIiQ_kHPKfeInTDIodVDl2H_StM&token=48533" style={{ width: '256px', height: '256px', userSelect: 'none', border: '0px', padding: '0px', margin: '0px', maxWidth: 'none' }} /></div><div style={{ position: 'absolute', left: '256px', top: '256px', width: '256px', height: '256px', transition: 'opacity 200ms linear 0s' }}><img draggable="false" alt="" role="presentation" src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i17!2i30305!3i52737!4i256!2m3!1e4!2st!3i581!2m3!1e0!2sr!3i581306170!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sTerrain!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyDr2SAnjIiQ_kHPKfeInTDIodVDl2H_StM&token=51154" style={{ width: '256px', height: '256px', userSelect: 'none', border: '0px', padding: '0px', margin: '0px', maxWidth: 'none' }} /></div><div style={{ position: 'absolute', left: '0px', top: '256px', width: '256px', height: '256px', transition: 'opacity 200ms linear 0s' }}><img draggable="false" alt="" role="presentation" src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i17!2i30304!3i52737!4i256!2m3!1e4!2st!3i581!2m3!1e0!2sr!3i581306194!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sTerrain!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyDr2SAnjIiQ_kHPKfeInTDIodVDl2H_StM&token=82962" style={{ width: '256px', height: '256px', userSelect: 'none', border: '0px', padding: '0px', margin: '0px', maxWidth: 'none' }} /></div><div style={{ position: 'absolute', left: '-256px', top: '256px', width: '256px', height: '256px', transition: 'opacity 200ms linear 0s' }}><img draggable="false" alt="" role="presentation" src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i17!2i30303!3i52737!4i256!2m3!1e4!2st!3i581!2m3!1e0!2sr!3i581306194!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sTerrain!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyDr2SAnjIiQ_kHPKfeInTDIodVDl2H_StM&token=45600" style={{ width: '256px', height: '256px', userSelect: 'none', border: '0px', padding: '0px', margin: '0px', maxWidth: 'none' }} /></div><div style={{ position: 'absolute', left: '-256px', top: '-256px', width: '256px', height: '256px', transition: 'opacity 200ms linear 0s' }}><img draggable="false" alt="" role="presentation" src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i17!2i30303!3i52735!4i256!2m3!1e4!2st!3i581!2m3!1e0!2sr!3i581306194!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sTerrain!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2&key=AIzaSyDr2SAnjIiQ_kHPKfeInTDIodVDl2H_StM&token=51466" style={{ width: '256px', height: '256px', userSelect: 'none', border: '0px', padding: '0px', margin: '0px', maxWidth: 'none' }} /></div></div></div></div><div style={{ zIndex: 3, position: 'absolute', height: '100%', width: '100%', padding: '0px', borderWidth: '0px', margin: '0px', left: '0px', top: '0px', touchAction: 'pan-x pan-y' }}><div style={{ zIndex: 4, position: 'absolute', left: '50%', top: '50%', width: '100%', transform: 'translate(0px, 0px)' }}><div style={{ position: 'absolute', left: '0px', top: '0px', zIndex: 104, width: '100%' }} /><div style={{ position: 'absolute', left: '0px', top: '0px', zIndex: 105, width: '100%' }} /><div style={{ position: 'absolute', left: '0px', top: '0px', zIndex: 106, width: '100%' }}><div aria-label="Carnatic Music Concert 2020" role="button" tabIndex={0} style={{ width: '27px', height: '43px', overflow: 'hidden', position: 'absolute', left: '-14px', top: '-43px', zIndex: 0 }}><img alt="" src="https://maps.gstatic.com/mapfiles/transparent.png" draggable="false" useMap="#gmimap0" style={{ width: '27px', height: '43px', userSelect: 'none', border: '0px', padding: '0px', margin: '0px', maxWidth: 'none' }} /><map name="gmimap0" id="gmimap0"><area log="miw" coords="13.5,0,4,3.75,0,13.5,13.5,43,27,13.5,23,3.75" shape="poly" tabIndex={-1} title="Carnatic Music Concert 2020" style={{ cursor: 'pointer', touchAction: 'none' }} /></map></div></div><div style={{ position: 'absolute', left: '0px', top: '0px', zIndex: 107, width: '100%' }} /></div></div><div className="gm-style-moc" style={{ zIndex: 4, position: 'absolute', height: '100%', width: '100%', padding: '0px', borderWidth: '0px', margin: '0px', left: '0px', top: '0px', opacity: 0, transitionDuration: '0.8s' }}><p className="gm-style-mot">Use ctrl + scroll to zoom the map</p></div></div><iframe aria-hidden="true" frameBorder={0} tabIndex={-1} style={{ zIndex: -1, position: 'absolute', width: '100%', height: '100%', top: '0px', left: '0px', border: 'none' }} /><div style={{ pointerEvents: 'none', width: '100%', height: '100%', boxSizing: 'border-box', position: 'absolute', zIndex: 1000002, opacity: 0, border: '2px solid rgb(26, 115, 232)' }} /><div><div className="gmnoprint" role="menubar" style={{ margin: '10px', zIndex: 0, position: 'absolute', cursor: 'pointer', left: '0px', top: '0px' }}><div className="gm-style-mtc" style={{ float: 'left', position: 'relative' }}><button draggable="false" aria-label="Show street map" title="Show street map" type="button" role="menuitemradio" aria-checked="true" style={{ background: 'none padding-box rgb(255, 255, 255)', display: 'table-cell', border: '0px', margin: '0px', padding: '0px 17px', textTransform: 'none', appearance: 'none', position: 'relative', cursor: 'pointer', userSelect: 'none', direction: 'ltr', overflow: 'hidden', textAlign: 'center', height: '40px', verticalAlign: 'middle', color: 'rgb(0, 0, 0)', fontFamily: 'Roboto, Arial, sans-serif', fontSize: '18px', borderBottomLeftRadius: '2px', borderTopLeftRadius: '2px', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px', minWidth: '36px', fontWeight: 500 }} id="56926099-DA8E-4BE9-BA3F-97673D99D0A8" aria-expanded="false">Map</button><ul role="menu" aria-labelledby="56926099-DA8E-4BE9-BA3F-97673D99D0A8" style={{ backgroundColor: 'white', listStyle: 'none', padding: '2px', margin: '0px', zIndex: -1, borderBottomLeftRadius: '2px', borderBottomRightRadius: '2px', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px', position: 'absolute', left: '0px', top: '40px', textAlign: 'left', display: 'none' }}><li tabIndex={-1} role="menuitemcheckbox" aria-label="Show street map with terrain" draggable="false" title="Show street map with terrain" aria-checked="true" style={{ color: 'black', fontFamily: 'Roboto, Arial, sans-serif', userSelect: 'none', fontSize: '18px', backgroundColor: 'rgb(255, 255, 255)', padding: '5px 8px 5px 5px', direction: 'ltr', textAlign: 'left', whiteSpace: 'nowrap' }}><span><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%3Cpath%20d%3D%22M19%203H5c-1.11%200-2%20.9-2%202v14c0%201.1.89%202%202%202h14c1.11%200%202-.9%202-2V5c0-1.1-.89-2-2-2zm-9%2014l-5-5%201.41-1.41L10%2014.17l7.59-7.59L19%208l-9%209z%22/%3E%3C/svg%3E" alt="" style={{ height: '1em', width: '1em', transform: 'translateY(0.15em)' }} /><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M19%205v14H5V5h14m0-2H5c-1.1%200-2%20.9-2%202v14c0%201.1.9%202%202%202h14c1.1%200%202-.9%202-2V5c0-1.1-.9-2-2-2z%22/%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%3C/svg%3E" alt="" style={{ height: '1em', width: '1em', transform: 'translateY(0.15em)', display: 'none' }} /></span><label style={{ cursor: 'inherit' }}>Terrain</label></li></ul></div><div className="gm-style-mtc" style={{ float: 'left', position: 'relative' }}><button draggable="false" aria-label="Show satellite imagery" title="Show satellite imagery" type="button" role="menuitemradio" aria-checked="false" style={{ background: 'none padding-box rgb(255, 255, 255)', display: 'table-cell', border: '0px', margin: '0px', padding: '0px 17px', textTransform: 'none', appearance: 'none', position: 'relative', cursor: 'pointer', userSelect: 'none', direction: 'ltr', overflow: 'hidden', textAlign: 'center', height: '40px', verticalAlign: 'middle', color: 'rgb(86, 86, 86)', fontFamily: 'Roboto, Arial, sans-serif', fontSize: '18px', borderBottomRightRadius: '2px', borderTopRightRadius: '2px', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px', minWidth: '66px' }} id="69B147FE-7D64-4BE8-8398-071EB4348F12" aria-expanded="false">Satellite</button><ul role="menu" aria-labelledby="69B147FE-7D64-4BE8-8398-071EB4348F12" style={{ backgroundColor: 'white', listStyle: 'none', padding: '2px', margin: '0px', zIndex: -1, borderBottomLeftRadius: '2px', borderBottomRightRadius: '2px', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px', position: 'absolute', right: '0px', top: '40px', textAlign: 'left', display: 'none' }}><li tabIndex={-1} role="menuitemcheckbox" aria-label="Show imagery with street names" draggable="false" title="Show imagery with street names" aria-checked="true" style={{ color: 'black', fontFamily: 'Roboto, Arial, sans-serif', userSelect: 'none', fontSize: '18px', backgroundColor: 'rgb(255, 255, 255)', padding: '5px 8px 5px 5px', direction: 'ltr', textAlign: 'left', whiteSpace: 'nowrap' }}><span><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%3Cpath%20d%3D%22M19%203H5c-1.11%200-2%20.9-2%202v14c0%201.1.89%202%202%202h14c1.11%200%202-.9%202-2V5c0-1.1-.89-2-2-2zm-9%2014l-5-5%201.41-1.41L10%2014.17l7.59-7.59L19%208l-9%209z%22/%3E%3C/svg%3E" alt="" style={{ height: '1em', width: '1em', transform: 'translateY(0.15em)' }} /><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M19%205v14H5V5h14m0-2H5c-1.1%200-2%20.9-2%202v14c0%201.1.9%202%202%202h14c1.1%200%202-.9%202-2V5c0-1.1-.9-2-2-2z%22/%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%3C/svg%3E" alt="" style={{ height: '1em', width: '1em', transform: 'translateY(0.15em)', display: 'none' }} /></span><label style={{ cursor: 'inherit' }}>Labels</label></li></ul></div></div></div><div /><div /><div /><div><button draggable="false" aria-label="Toggle fullscreen view" title="Toggle fullscreen view" type="button" className="gm-control-active gm-fullscreen-control" style={{ background: 'none rgb(255, 255, 255)', border: '0px', margin: '10px', padding: '0px', textTransform: 'none', appearance: 'none', position: 'absolute', cursor: 'pointer', userSelect: 'none', borderRadius: '2px', height: '40px', width: '40px', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px', overflow: 'hidden', top: '0px', right: '0px' }}><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%200v6h2V2h4V0H0zm16%200h-4v2h4v4h2V0h-2zm0%2016h-4v2h6v-6h-2v4zM2%2012H0v6h6v-2H2v-4z%22/%3E%3C/svg%3E" alt="" style={{ height: '18px', width: '18px' }} /><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M0%200v6h2V2h4V0H0zm16%200h-4v2h4v4h2V0h-2zm0%2016h-4v2h6v-6h-2v4zM2%2012H0v6h6v-2H2v-4z%22/%3E%3C/svg%3E" alt="" style={{ height: '18px', width: '18px' }} /><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M0%200v6h2V2h4V0H0zm16%200h-4v2h4v4h2V0h-2zm0%2016h-4v2h6v-6h-2v4zM2%2012H0v6h6v-2H2v-4z%22/%3E%3C/svg%3E" alt="" style={{ height: '18px', width: '18px' }} /></button></div><div /><div /><div /><div /><div><div className="gmnoprint gm-bundled-control gm-bundled-control-on-bottom" draggable="false" controlwidth={40} controlheight={153} style={{ margin: '10px', userSelect: 'none', position: 'absolute', bottom: '167px', right: '40px' }}><div className="gmnoprint" controlwidth={40} controlheight={40} style={{ display: 'none', position: 'absolute' }}><div style={{ backgroundColor: 'rgb(255, 255, 255)', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px', borderRadius: '2px', width: '40px', height: '40px' }}><button draggable="false" aria-label="Rotate map clockwise" title="Rotate map clockwise" type="button" className="gm-control-active" style={{ background: 'none', display: 'none', border: '0px', margin: '0px', padding: '0px', textTransform: 'none', appearance: 'none', position: 'relative', cursor: 'pointer', userSelect: 'none', left: '0px', top: '0px', overflow: 'hidden', width: '40px', height: '40px' }}><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h24v24H0V0z%22/%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M12.06%209.06l4-4-4-4-1.41%201.41%201.59%201.59h-.18c-2.3%200-4.6.88-6.35%202.64-3.52%203.51-3.52%209.21%200%2012.72%201.5%201.5%203.4%202.36%205.36%202.58v-2.02c-1.44-.21-2.84-.86-3.95-1.97-2.73-2.73-2.73-7.17%200-9.9%201.37-1.37%203.16-2.05%204.95-2.05h.17l-1.59%201.59%201.41%201.41zm8.94%203c-.19-1.74-.88-3.32-1.91-4.61l-1.43%201.43c.69.92%201.15%202%201.32%203.18H21zm-7.94%207.92V22c1.74-.19%203.32-.88%204.61-1.91l-1.43-1.43c-.91.68-2%201.15-3.18%201.32zm4.6-2.74l1.43%201.43c1.04-1.29%201.72-2.88%201.91-4.61h-2.02c-.17%201.18-.64%202.27-1.32%203.18z%22/%3E%3C/svg%3E" style={{ width: '20px', height: '20px' }} /><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h24v24H0V0z%22/%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M12.06%209.06l4-4-4-4-1.41%201.41%201.59%201.59h-.18c-2.3%200-4.6.88-6.35%202.64-3.52%203.51-3.52%209.21%200%2012.72%201.5%201.5%203.4%202.36%205.36%202.58v-2.02c-1.44-.21-2.84-.86-3.95-1.97-2.73-2.73-2.73-7.17%200-9.9%201.37-1.37%203.16-2.05%204.95-2.05h.17l-1.59%201.59%201.41%201.41zm8.94%203c-.19-1.74-.88-3.32-1.91-4.61l-1.43%201.43c.69.92%201.15%202%201.32%203.18H21zm-7.94%207.92V22c1.74-.19%203.32-.88%204.61-1.91l-1.43-1.43c-.91.68-2%201.15-3.18%201.32zm4.6-2.74l1.43%201.43c1.04-1.29%201.72-2.88%201.91-4.61h-2.02c-.17%201.18-.64%202.27-1.32%203.18z%22/%3E%3C/svg%3E" style={{ width: '20px', height: '20px' }} /><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h24v24H0V0z%22/%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M12.06%209.06l4-4-4-4-1.41%201.41%201.59%201.59h-.18c-2.3%200-4.6.88-6.35%202.64-3.52%203.51-3.52%209.21%200%2012.72%201.5%201.5%203.4%202.36%205.36%202.58v-2.02c-1.44-.21-2.84-.86-3.95-1.97-2.73-2.73-2.73-7.17%200-9.9%201.37-1.37%203.16-2.05%204.95-2.05h.17l-1.59%201.59%201.41%201.41zm8.94%203c-.19-1.74-.88-3.32-1.91-4.61l-1.43%201.43c.69.92%201.15%202%201.32%203.18H21zm-7.94%207.92V22c1.74-.19%203.32-.88%204.61-1.91l-1.43-1.43c-.91.68-2%201.15-3.18%201.32zm4.6-2.74l1.43%201.43c1.04-1.29%201.72-2.88%201.91-4.61h-2.02c-.17%201.18-.64%202.27-1.32%203.18z%22/%3E%3C/svg%3E" style={{ width: '20px', height: '20px' }} /></button><div style={{ position: 'relative', overflow: 'hidden', width: '30px', height: '1px', margin: '0px 5px', backgroundColor: 'rgb(230, 230, 230)', display: 'none' }} /><button draggable="false" aria-label="Rotate map counterclockwise" title="Rotate map counterclockwise" type="button" className="gm-control-active" style={{ background: 'none', display: 'none', border: '0px', margin: '0px', padding: '0px', textTransform: 'none', appearance: 'none', position: 'relative', cursor: 'pointer', userSelect: 'none', left: '0px', top: '0px', overflow: 'hidden', width: '40px', height: '40px', transform: 'scaleX(-1)' }}><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h24v24H0V0z%22/%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M12.06%209.06l4-4-4-4-1.41%201.41%201.59%201.59h-.18c-2.3%200-4.6.88-6.35%202.64-3.52%203.51-3.52%209.21%200%2012.72%201.5%201.5%203.4%202.36%205.36%202.58v-2.02c-1.44-.21-2.84-.86-3.95-1.97-2.73-2.73-2.73-7.17%200-9.9%201.37-1.37%203.16-2.05%204.95-2.05h.17l-1.59%201.59%201.41%201.41zm8.94%203c-.19-1.74-.88-3.32-1.91-4.61l-1.43%201.43c.69.92%201.15%202%201.32%203.18H21zm-7.94%207.92V22c1.74-.19%203.32-.88%204.61-1.91l-1.43-1.43c-.91.68-2%201.15-3.18%201.32zm4.6-2.74l1.43%201.43c1.04-1.29%201.72-2.88%201.91-4.61h-2.02c-.17%201.18-.64%202.27-1.32%203.18z%22/%3E%3C/svg%3E" style={{ width: '20px', height: '20px' }} /><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h24v24H0V0z%22/%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M12.06%209.06l4-4-4-4-1.41%201.41%201.59%201.59h-.18c-2.3%200-4.6.88-6.35%202.64-3.52%203.51-3.52%209.21%200%2012.72%201.5%201.5%203.4%202.36%205.36%202.58v-2.02c-1.44-.21-2.84-.86-3.95-1.97-2.73-2.73-2.73-7.17%200-9.9%201.37-1.37%203.16-2.05%204.95-2.05h.17l-1.59%201.59%201.41%201.41zm8.94%203c-.19-1.74-.88-3.32-1.91-4.61l-1.43%201.43c.69.92%201.15%202%201.32%203.18H21zm-7.94%207.92V22c1.74-.19%203.32-.88%204.61-1.91l-1.43-1.43c-.91.68-2%201.15-3.18%201.32zm4.6-2.74l1.43%201.43c1.04-1.29%201.72-2.88%201.91-4.61h-2.02c-.17%201.18-.64%202.27-1.32%203.18z%22/%3E%3C/svg%3E" style={{ width: '20px', height: '20px' }} /><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h24v24H0V0z%22/%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M12.06%209.06l4-4-4-4-1.41%201.41%201.59%201.59h-.18c-2.3%200-4.6.88-6.35%202.64-3.52%203.51-3.52%209.21%200%2012.72%201.5%201.5%203.4%202.36%205.36%202.58v-2.02c-1.44-.21-2.84-.86-3.95-1.97-2.73-2.73-2.73-7.17%200-9.9%201.37-1.37%203.16-2.05%204.95-2.05h.17l-1.59%201.59%201.41%201.41zm8.94%203c-.19-1.74-.88-3.32-1.91-4.61l-1.43%201.43c.69.92%201.15%202%201.32%203.18H21zm-7.94%207.92V22c1.74-.19%203.32-.88%204.61-1.91l-1.43-1.43c-.91.68-2%201.15-3.18%201.32zm4.6-2.74l1.43%201.43c1.04-1.29%201.72-2.88%201.91-4.61h-2.02c-.17%201.18-.64%202.27-1.32%203.18z%22/%3E%3C/svg%3E" style={{ width: '20px', height: '20px' }} /></button><div style={{ position: 'relative', overflow: 'hidden', width: '30px', height: '1px', margin: '0px 5px', backgroundColor: 'rgb(230, 230, 230)', display: 'none' }} /><button draggable="false" aria-label="Tilt map" title="Tilt map" type="button" className="gm-tilt gm-control-active" style={{ background: 'none', display: 'block', border: '0px', margin: '0px', padding: '0px', textTransform: 'none', appearance: 'none', position: 'relative', cursor: 'pointer', userSelect: 'none', top: '0px', left: '0px', overflow: 'hidden', width: '40px', height: '40px' }}><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2016%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%2016h8V9H0v7zm10%200h8V9h-8v7zM0%207h8V0H0v7zm10-7v7h8V0h-8z%22/%3E%3C/svg%3E" style={{ width: '18px' }} /><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2016%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M0%2016h8V9H0v7zm10%200h8V9h-8v7zM0%207h8V0H0v7zm10-7v7h8V0h-8z%22/%3E%3C/svg%3E" style={{ width: '18px' }} /><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2016%22%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M0%2016h8V9H0v7zm10%200h8V9h-8v7zM0%207h8V0H0v7zm10-7v7h8V0h-8z%22/%3E%3C/svg%3E" style={{ width: '18px' }} /></button></div></div><div className="gm-svpc" dir="ltr" title="Drag Pegman onto the map to open Street View" controlwidth={40} controlheight={40} style={{ backgroundColor: 'rgb(255, 255, 255)', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px', borderRadius: '2px', width: '40px', height: '40px', cursor: 'url("https://maps.gstatic.com/mapfiles/openhand_8_8.cur"), default', touchAction: 'none', position: 'absolute', left: '0px', top: '0px' }}><div style={{ position: 'absolute', left: '50%', top: '50%' }} /><div style={{ position: 'absolute', left: '50%', top: '50%' }}><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2023%2038%22%3E%3Cpath%20d%3D%22M16.6%2038.1h-5.5l-.2-2.9-.2%202.9h-5.5L5%2025.3l-.8%202a1.53%201.53%200%2001-1.9.9l-1.2-.4a1.58%201.58%200%2001-1-1.9v-.1c.3-.9%203.1-11.2%203.1-11.2a2.66%202.66%200%20012.3-2l.6-.5a6.93%206.93%200%20014.7-12%206.8%206.8%200%20014.9%202%207%207%200%20012%204.9%206.65%206.65%200%2001-2.2%205l.7.5a2.78%202.78%200%20012.4%202s2.9%2011.2%202.9%2011.3a1.53%201.53%200%2001-.9%201.9l-1.3.4a1.63%201.63%200%2001-1.9-.9l-.7-1.8-.1%2012.7zm-3.6-2h1.7L14.9%2020.3l1.9-.3%202.4%206.3.3-.1c-.2-.8-.8-3.2-2.8-10.9a.63.63%200%2000-.6-.5h-.6l-1.1-.9h-1.9l-.3-2a4.83%204.83%200%20003.5-4.7A4.78%204.78%200%200011%202.3H10.8a4.9%204.9%200%2000-1.4%209.6l-.3%202h-1.9l-1%20.9h-.6a.74.74%200%2000-.6.5c-2%207.5-2.7%2010-3%2010.9l.3.1L4.8%2020l1.9.3.2%2015.8h1.6l.6-8.4a1.52%201.52%200%20011.5-1.4%201.5%201.5%200%20011.5%201.4l.9%208.4zm-10.9-9.6zm17.5-.1z%22%20style%3D%22isolation%3Aisolate%22%20fill%3D%22%23333%22%20opacity%3D%22.7%22/%3E%3Cpath%20d%3D%22M5.9%2013.6l1.1-.9h7.8l1.2.9%22%20fill%3D%22%23ce592c%22/%3E%3Cellipse%20cx%3D%2210.9%22%20cy%3D%2213.1%22%20rx%3D%222.7%22%20ry%3D%22.3%22%20style%3D%22isolation%3Aisolate%22%20fill%3D%22%23ce592c%22%20opacity%3D%22.5%22/%3E%3Cpath%20d%3D%22M20.6%2026.1l-2.9-11.3a1.71%201.71%200%2000-1.6-1.2H5.699999999999999a1.69%201.69%200%2000-1.5%201.3l-3.1%2011.3a.61.61%200%2000.3.7l1.1.4a.61.61%200%2000.7-.3l2.7-6.7.2%2016.8h3.6l.6-9.3a.47.47%200%2001.44-.5h.06c.4%200%20.4.2.5.5l.6%209.3h3.6L15.7%2020.3l2.5%206.6a.52.52%200%2000.66.31l1.2-.4a.57.57%200%2000.5-.7z%22%20fill%3D%22%23fdbf2d%22/%3E%3Cpath%20d%3D%22M7%2013.6l3.9%206.7%203.9-6.7%22%20style%3D%22isolation%3Aisolate%22%20fill%3D%22%23cf572e%22%20opacity%3D%22.6%22/%3E%3Ccircle%20cx%3D%2210.9%22%20cy%3D%227%22%20r%3D%225.9%22%20fill%3D%22%23fdbf2d%22/%3E%3C/svg%3E" aria-label="Street View Pegman Control" style={{ height: '30px', width: '30px', position: 'absolute', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} /><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2038%22%3E%3Cpath%20d%3D%22M22%2026.6l-2.9-11.3a2.78%202.78%200%2000-2.4-2l-.7-.5a6.82%206.82%200%20002.2-5%206.9%206.9%200%2000-13.8%200%207%207%200%20002.2%205.1l-.6.5a2.55%202.55%200%2000-2.3%202s-3%2011.1-3%2011.2v.1a1.58%201.58%200%20001%201.9l1.2.4a1.63%201.63%200%20001.9-.9l.8-2%20.2%2012.8h11.3l.2-12.6.7%201.8a1.54%201.54%200%20001.5%201%201.09%201.09%200%2000.5-.1l1.3-.4a1.85%201.85%200%2000.7-2zm-1.2.9l-1.2.4a.61.61%200%2001-.7-.3l-2.5-6.6-.2%2016.8h-9.4L6.6%2021l-2.7%206.7a.52.52%200%2001-.66.31l-1.1-.4a.52.52%200%2001-.31-.66l3.1-11.3a1.69%201.69%200%20011.5-1.3h.2l1-.9h2.3a5.9%205.9%200%20113.2%200h2.3l1.1.9h.2a1.71%201.71%200%20011.6%201.2l2.9%2011.3a.84.84%200%2001-.4.7z%22%20fill%3D%22%23333%22%20fill-opacity%3D%22.2%22/%3E%26quot%3B%3C/svg%3E" aria-label="Pegman is on top of the Map" style={{ display: 'none', height: '30px', width: '30px', position: 'absolute', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} /><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2040%2050%22%3E%3Cpath%20d%3D%22M34-30.4l-2.9-11.3a2.78%202.78%200%2000-2.4-2l-.7-.5a6.82%206.82%200%20002.2-5%206.9%206.9%200%2000-13.8%200%207%207%200%20002.2%205.1l-.6.5a2.55%202.55%200%2000-2.3%202s-3%2011.1-3%2011.2v.1a1.58%201.58%200%20001%201.9l1.2.4a1.63%201.63%200%20001.9-.9l.8-2%20.2%2012.8h11.3l.2-12.6.7%201.8a1.54%201.54%200%20001.5%201%201.09%201.09%200%2000.5-.1l1.3-.4a1.85%201.85%200%2000.7-2zm-1.2.9l-1.2.4a.61.61%200%2001-.7-.3L28.4-36l-.2%2016.8h-9.4L18.6-36l-2.7%206.7a.52.52%200%2001-.66.31l-1.1-.4a.52.52%200%2001-.31-.66l3.1-11.3a1.69%201.69%200%20011.5-1.3h.2l1-.9h2.3a5.9%205.9%200%20113.2%200h2.3l1.1.9h.2a1.71%201.71%200%20011.6%201.2l2.9%2011.3a.84.84%200%2001-.4.7zM34%2029.6l-2.9-11.3a2.78%202.78%200%2000-2.4-2l-.7-.5a6.82%206.82%200%20002.2-5%206.9%206.9%200%2000-13.8%200%207%207%200%20002.2%205.1l-.6.5a2.55%202.55%200%2000-2.3%202s-3%2011.1-3%2011.2v.1a1.58%201.58%200%20001%201.9l1.2.4a1.63%201.63%200%20001.9-.9l.8-2%20.2%2012.8h11.3l.2-12.6.7%201.8a1.54%201.54%200%20001.5%201%201.09%201.09%200%2000.5-.1l1.3-.4a1.85%201.85%200%2000.7-2zm-1.2.9l-1.2.4a.61.61%200%2001-.7-.3L28.4%2024l-.2%2016.8h-9.4L18.6%2024l-2.7%206.7a.52.52%200%2001-.66.31l-1.1-.4a.52.52%200%2001-.31-.66l3.1-11.3a1.69%201.69%200%20011.5-1.3h.2l1-.9h2.3a5.9%205.9%200%20113.2%200h2.3l1.1.9h.2a1.71%201.71%200%20011.6%201.2l2.9%2011.3a.84.84%200%2001-.4.7z%22%20fill%3D%22%23333%22%20fill-opacity%3D%22.2%22/%3E%3Cpath%20d%3D%22M15.4%2038.8h-4a1.64%201.64%200%2001-1.4-1.1l-3.1-8a.9.9%200%2001-.5.1l-1.4.1a1.62%201.62%200%2001-1.6-1.4L2.3%2015.4l1.6-1.3a6.87%206.87%200%2001-3-4.6A7.14%207.14%200%20012%204a7.6%207.6%200%20014.7-3.1A7.14%207.14%200%200112.2%202a7.28%207.28%200%20012.3%209.6l2.1-.1.1%201c0%20.2.1.5.1.8a2.41%202.41%200%20011%201s1.9%203.2%202.8%204.9c.7%201.2%202.1%204.2%202.8%205.9a2.1%202.1%200%2001-.8%202.6l-.6.4a1.63%201.63%200%2001-1.5.2l-.6-.3a8.93%208.93%200%2000.5%201.3%207.91%207.91%200%20001.8%202.6l.6.3v4.6l-4.5-.1a7.32%207.32%200%2001-2.5-1.5l-.4%203.6zm-10-19.2l3.5%209.8%202.9%207.5h1.6V35l-1.9-9.4%203.1%205.4a8.24%208.24%200%20003.8%203.8h2.1v-1.4a14%2014%200%2001-2.2-3.1%2044.55%2044.55%200%2001-2.2-8l-1.3-6.3%203.2%205.6c.6%201.1%202.1%203.6%202.8%204.9l.6-.4c-.8-1.6-2.1-4.6-2.8-5.8-.9-1.7-2.8-4.9-2.8-4.9a.54.54%200%2000-.4-.3l-.7-.1-.1-.7a4.33%204.33%200%2000-.1-.5l-5.3.3%202.2-1.9a4.3%204.3%200%2000.9-1%205.17%205.17%200%2000.8-4%205.67%205.67%200%2000-2.2-3.4%205.09%205.09%200%2000-4-.8%205.67%205.67%200%2000-3.4%202.2%205.17%205.17%200%2000-.8%204%205.67%205.67%200%20002.2%203.4%203.13%203.13%200%20001%20.5l1.6.6-3.2%202.6%201%2011.5h.4l-.3-8.2z%22%20fill%3D%22%23333%22/%3E%3Cpath%20d%3D%22M3.35%2015.9l1.1%2012.5a.39.39%200%2000.36.42h.14l1.4-.1a.66.66%200%2000.5-.4l-.2-3.8-3.3-8.6z%22%20fill%3D%22%23fdbf2d%22/%3E%3Cpath%20d%3D%22M5.2%2028.8l1.1-.1a.66.66%200%2000.5-.4l-.2-3.8-1.2-3.1z%22%20fill%3D%22%23ce592b%22%20fill-opacity%3D%22.25%22/%3E%3Cpath%20d%3D%22M21.4%2035.7l-3.8-1.2-2.7-7.8L12%2015.5l3.4-2.9c.2%202.4%202.2%2014.1%203.7%2017.1%200%200%201.3%202.6%202.3%203.1v2.9m-8.4-8.1l-2-.3%202.5%2010.1.9.4v-2.9%22%20fill%3D%22%23e5892b%22/%3E%3Cpath%20d%3D%22M17.8%2025.4c-.4-1.5-.7-3.1-1.1-4.8-.1-.4-.1-.7-.2-1.1l-1.1-2-1.7-1.6s.9%205%202.4%207.1a19.12%2019.12%200%20001.7%202.4z%22%20style%3D%22isolation%3Aisolate%22%20fill%3D%22%23cf572e%22%20opacity%3D%22.6%22/%3E%3Cpath%20d%3D%22M14.4%2037.8h-3a.43.43%200%2001-.4-.4l-3-7.8-1.7-4.8-3-9%208.9-.4s2.9%2011.3%204.3%2014.4c1.9%204.1%203.1%204.7%205%205.8h-3.2s-4.1-1.2-5.9-7.7a.59.59%200%2000-.6-.4.62.62%200%2000-.3.7s.5%202.4.9%203.6a34.87%2034.87%200%20002%206z%22%20fill%3D%22%23fdbf2d%22/%3E%3Cpath%20d%3D%22M15.4%2012.7l-3.3%202.9-8.9.4%203.3-2.7%22%20fill%3D%22%23ce592b%22/%3E%3Cpath%20d%3D%22M9.1%2021.1l1.4-6.2-5.9.5%22%20style%3D%22isolation%3Aisolate%22%20fill%3D%22%23cf572e%22%20opacity%3D%22.6%22/%3E%3Cpath%20d%3D%22M12%2013.5a4.75%204.75%200%2001-2.6%201.1c-1.5.3-2.9.2-2.9%200s1.1-.6%202.7-1%22%20fill%3D%22%23bb3d19%22/%3E%3Ccircle%20cx%3D%227.92%22%20cy%3D%228.19%22%20r%3D%226.3%22%20fill%3D%22%23fdbf2d%22/%3E%3Cpath%20d%3D%22M4.7%2013.6a6.21%206.21%200%20008.4-1.9v-.1a8.89%208.89%200%2001-8.4%202z%22%20fill%3D%22%23ce592b%22%20fill-opacity%3D%22.25%22/%3E%3Cpath%20d%3D%22M21.2%2027.2l.6-.4a1.09%201.09%200%2000.4-1.3c-.7-1.5-2.1-4.6-2.8-5.8-.9-1.7-2.8-4.9-2.8-4.9a1.6%201.6%200%2000-2.17-.65l-.23.15a1.68%201.68%200%2000-.4%202.1s2.3%203.9%203.1%205.3c.6%201%202.1%203.7%202.9%205.1a.94.94%200%20001.24.49l.16-.09z%22%20fill%3D%22%23fdbf2d%22/%3E%3Cpath%20d%3D%22M19.4%2019.8c-.9-1.7-2.8-4.9-2.8-4.9a1.6%201.6%200%2000-2.17-.65l-.23.15-.3.3c1.1%201.5%202.9%203.8%203.9%205.4%201.1%201.8%202.9%205%203.8%206.7l.1-.1a1.09%201.09%200%2000.4-1.3%2057.67%2057.67%200%2000-2.7-5.6z%22%20fill%3D%22%23ce592b%22%20fill-opacity%3D%22.25%22/%3E%3C/svg%3E" aria-label="Street View Pegman Control" style={{ display: 'none', height: '40px', width: '40px', position: 'absolute', transform: 'translate(-60%, -45%)', pointerEvents: 'none' }} /></div></div><div className="gmnoprint" controlwidth={40} controlheight={81} style={{ position: 'absolute', left: '0px', top: '72px' }}><div draggable="false" style={{ userSelect: 'none', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px', borderRadius: '2px', cursor: 'pointer', backgroundColor: 'rgb(255, 255, 255)', width: '40px', height: '81px' }}><button draggable="false" aria-label="Zoom in" title="Zoom in" type="button" className="gm-control-active" style={{ background: 'none', display: 'block', border: '0px', margin: '0px', padding: '0px', textTransform: 'none', appearance: 'none', position: 'relative', cursor: 'pointer', userSelect: 'none', overflow: 'hidden', width: '40px', height: '40px', top: '0px', left: '0px' }}><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M18%207h-7V0H7v7H0v4h7v7h4v-7h7z%22/%3E%3C/svg%3E" alt="" style={{ height: '18px', width: '18px' }} /><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M18%207h-7V0H7v7H0v4h7v7h4v-7h7z%22/%3E%3C/svg%3E" alt="" style={{ height: '18px', width: '18px' }} /><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M18%207h-7V0H7v7H0v4h7v7h4v-7h7z%22/%3E%3C/svg%3E" alt="" style={{ height: '18px', width: '18px' }} /></button><div style={{ position: 'relative', overflow: 'hidden', width: '30px', height: '1px', margin: '0px 5px', backgroundColor: 'rgb(230, 230, 230)', top: '0px' }} /><button draggable="false" aria-label="Zoom out" title="Zoom out" type="button" className="gm-control-active" style={{ background: 'none', display: 'block', border: '0px', margin: '0px', padding: '0px', textTransform: 'none', appearance: 'none', position: 'relative', cursor: 'pointer', userSelect: 'none', overflow: 'hidden', width: '40px', height: '40px', top: '0px', left: '0px' }}><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%207h18v4H0V7z%22/%3E%3C/svg%3E" alt="" style={{ height: '18px', width: '18px' }} /><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M0%207h18v4H0V7z%22/%3E%3C/svg%3E" alt="" style={{ height: '18px', width: '18px' }} /><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M0%207h18v4H0V7z%22/%3E%3C/svg%3E" alt="" style={{ height: '18px', width: '18px' }} /></button></div></div></div></div><div><div style={{ marginLeft: '5px', marginRight: '5px', zIndex: 1000000, position: 'absolute', left: '0px', bottom: '0px' }}><a target="_blank" rel="noopener" href="https://maps.google.com/maps?ll=33.136711,-96.766619&z=17&t=p&hl=en-US&gl=US&mapclient=apiv3" title="Open this area in Google Maps (opens a new window)" style={{ position: 'static', overflow: 'visible', float: 'none', display: 'inline' }}><div style={{ width: '66px', height: '26px', cursor: 'pointer' }}><img alt="" src="https://maps.gstatic.com/mapfiles/api-3/images/google4_hdpi.png" draggable="false" style={{ position: 'absolute', left: '0px', top: '0px', width: '66px', height: '26px', userSelect: 'none', border: '0px', padding: '0px', margin: '0px' }} /></div></a></div></div><div /><div><div className="gmnoprint" style={{ zIndex: 1000001, position: 'absolute', right: '252px', bottom: '0px' }}><div draggable="false" className="gm-style-cc" style={{ userSelect: 'none', height: '14px', lineHeight: '14px' }}><div style={{ opacity: '0.7', width: '100%', height: '100%', position: 'absolute' }}><div style={{ width: '1px' }} /><div style={{ backgroundColor: 'rgb(245, 245, 245)', width: 'auto', height: '100%', marginLeft: '1px' }} /></div><div style={{ position: 'relative', paddingRight: '6px', paddingLeft: '6px', boxSizing: 'border-box', fontFamily: 'Roboto, Arial, sans-serif', fontSize: '10px', color: 'rgb(0, 0, 0)', whiteSpace: 'nowrap', direction: 'ltr', textAlign: 'right', verticalAlign: 'middle', display: 'inline-block' }}><button draggable="false" aria-label="Keyboard shortcuts" title="Keyboard shortcuts" type="button" style={{ background: 'none', display: 'inline-block', border: '0px', margin: '0px', padding: '0px', textTransform: 'none', appearance: 'none', position: 'relative', cursor: 'pointer', userSelect: 'none', color: 'rgb(0, 0, 0)', fontFamily: 'inherit', lineHeight: 'normal' }}>Keyboard shortcuts</button></div></div></div><div className="gmnoprint" style={{ zIndex: 1000001, position: 'absolute', right: '166px', bottom: '0px', width: '86px' }}><div draggable="false" className="gm-style-cc" style={{ userSelect: 'none', height: '14px', lineHeight: '14px' }}><div style={{ opacity: '0.7', width: '100%', height: '100%', position: 'absolute' }}><div style={{ width: '1px' }} /><div style={{ backgroundColor: 'rgb(245, 245, 245)', width: 'auto', height: '100%', marginLeft: '1px' }} /></div><div style={{ position: 'relative', paddingRight: '6px', paddingLeft: '6px', boxSizing: 'border-box', fontFamily: 'Roboto, Arial, sans-serif', fontSize: '10px', color: 'rgb(0, 0, 0)', whiteSpace: 'nowrap', direction: 'ltr', textAlign: 'right', verticalAlign: 'middle', display: 'inline-block' }}><button draggable="false" aria-label="Map Data" title="Map Data" type="button" style={{ background: 'none', display: 'none', border: '0px', margin: '0px', padding: '0px', textTransform: 'none', appearance: 'none', position: 'relative', cursor: 'pointer', userSelect: 'none', color: 'rgb(0, 0, 0)', fontFamily: 'inherit', lineHeight: 'normal' }}>Map Data</button><span>Map data ©2021</span></div></div></div><div className="gmnoprint gm-style-cc" draggable="false" style={{ zIndex: 1000001, userSelect: 'none', height: '14px', lineHeight: '14px', position: 'absolute', right: '95px', bottom: '0px' }}><div style={{ opacity: '0.7', width: '100%', height: '100%', position: 'absolute' }}><div style={{ width: '1px' }} /><div style={{ backgroundColor: 'rgb(245, 245, 245)', width: 'auto', height: '100%', marginLeft: '1px' }} /></div><div style={{ position: 'relative', paddingRight: '6px', paddingLeft: '6px', boxSizing: 'border-box', fontFamily: 'Roboto, Arial, sans-serif', fontSize: '10px', color: 'rgb(0, 0, 0)', whiteSpace: 'nowrap', direction: 'ltr', textAlign: 'right', verticalAlign: 'middle', display: 'inline-block' }}><a href="https://www.google.com/intl/en-US_US/help/terms_maps.html" target="_blank" rel="noopener" style={{ textDecoration: 'none', cursor: 'pointer', color: 'rgb(0, 0, 0)' }}>Terms of Use</a></div></div><div draggable="false" className="gm-style-cc" style={{ userSelect: 'none', height: '14px', lineHeight: '14px', position: 'absolute', right: '0px', bottom: '0px' }}><div style={{ opacity: '0.7', width: '100%', height: '100%', position: 'absolute' }}><div style={{ width: '1px' }} /><div style={{ backgroundColor: 'rgb(245, 245, 245)', width: 'auto', height: '100%', marginLeft: '1px' }} /></div><div style={{ position: 'relative', paddingRight: '6px', paddingLeft: '6px', boxSizing: 'border-box', fontFamily: 'Roboto, Arial, sans-serif', fontSize: '10px', color: 'rgb(0, 0, 0)', whiteSpace: 'nowrap', direction: 'ltr', textAlign: 'right', verticalAlign: 'middle', display: 'inline-block' }}><a target="_blank" rel="noopener" title="Report errors in the road map or imagery to Google" dir="ltr" href="https://www.google.com/maps/@33.1367115,-96.7666191,17z/data=!5m1!1e4!10m1!1e1!12b1?source=apiv3&rapsrc=apiv3" style={{ fontFamily: 'Roboto, Arial, sans-serif', fontSize: '10px', color: 'rgb(0, 0, 0)', textDecoration: 'none', position: 'relative' }}>Report a map error</a></div></div><div className="gmnoscreen" style={{ position: 'absolute', right: '0px', bottom: '0px' }}><div style={{ fontFamily: 'Roboto, Arial, sans-serif', fontSize: '11px', color: 'rgb(0, 0, 0)', direction: 'ltr', textAlign: 'right', backgroundColor: 'rgb(245, 245, 245)' }}>Map data ©2021</div></div></div></div></div></div>
                        </div>
                        <div className="col-md-4 event-description-sidebar">
                            <div className="sidebar-section hidden-initially" id="liveLink">
                                <h4>This event is Live</h4>
                                <div className="live-content">
                                    <a className="btn btn-action" aria-label="Watch live" href="#">Watch Live</a>
                                </div>
                                <span className="dashed-decoration-dark" />
                            </div>
                            <div className="sidebar-section hidden-initially">
                                <h4>PRICING</h4>
                                <p>Free</p>
                                <span className="dashed-decoration-dark" />
                            </div>
                            <div className="sidebar-section ticketing hidden-initially" id="ticketsDiv" style={{ display: 'none' }}>
                                <h4>TICKETS</h4>
                                <div className="ticketErrorMessage alert alert-danger hidden-initially" id="ticketErrorMessage" />
                                {/* ngRepeat: ticketCategory in event.ticketCategories */}
                                <div className="form-group inline-form-group">
                                    <label htmlFor="ticketBuyerName">Name</label>
                                    <input id="ticketBuyerName" data-ng-bind="eventUser.firstName" required placeholder="Name" type="text" className="ng-binding" />
                                </div>
                                <div className="form-group inline-form-group">
                                    <label htmlFor="ticketBuyerEmail">Email</label>
                                    <input id="ticketBuyerEmail" data-ng-bind="eventUser.emailAddress" required placeholder="Email" type="email" className="ng-binding" />
                                </div>
                                <div className="form-group inline-form-group">
                                    <label htmlFor="ticketBuyerPhone">Phone</label>
                                    <input id="ticketBuyerPhone" data-ng-bind="eventUser.phoneNumber" required placeholder="Phone" type="tel" className="ng-binding" />
                                </div>
                                <div className="form-group inline-form-group submit-rsvp">
                                    {/* ngIf: event.ticketCategories === null */}
                                    {/* ngIf: event.ticketCategories != null */}<a className="btn btn-action ng-scope" data-ng-if="event.ticketCategories != null" data-ng-click="addToCart()" aria-label="Checkout">Checkout</a>{/* end ngIf: event.ticketCategories != null */}
                                </div>
                                <span className="dashed-decoration-dark" />
                            </div>
                            <div className="sidebar-section rsvp-center" id="rsvpDiv" style={{ display: 'block' }}>
                                <h4>RSVP</h4>
                                <div className="ticketErrorMessage" id="rsvpErrorMessage" />
                                <div className="form-group inline-form-group">
                                    <label className="ticket-category">Adults</label>
                                    <div className="number-selector">
                                        <button className="minus" id="rsvpAdultMinus" disabled="disabled" data-ng-click="rsvpAdultMinus()" data-ng-disabled="eventUser.rsvpAdultCount === undefined || eventUser.rsvpAdultCount === null || eventUser.rsvpAdultCount === 0">
                                            <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{ height: '22px', width: '22px', display: 'block', fill: 'currentcolor' }}>
                                                <rect height={2} rx={1} width={12} x={6} y={11} />
                                            </svg> </button>
                                        <div className="selected-number">
                                            <p id="adultRsvpCount" data-ng-bind="eventUser.rsvpAdultCount" className="ng-binding">0</p>
                                        </div>
                                        <button className="plus" id="rsvpAdultPlus" data-ng-click="rsvpAdultPlus()">
                                            <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{ height: '22px', width: '22px', display: 'block', fill: 'currentcolor' }}>
                                                <rect height={2} rx={1} width={12} x={6} y={11} />
                                                <rect height={12} rx={1} width={2} x={11} y={6} />
                                            </svg> </button>
                                    </div>
                                </div>
                                <div className="form-group inline-form-group">
                                    <label className="ticket-category">Kids</label>
                                    <div className="number-selector">
                                        <button className="minus" id="rsvpKidMinus" disabled="disabled" data-ng-click="rsvpKidMinus()" data-ng-disabled="eventUser.rsvpKidCount === undefined || eventUser.rsvpKidCount === null || eventUser.rsvpKidCount === 0">
                                            <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{ height: '22px', width: '22px', display: 'block', fill: 'currentcolor' }}>
                                                <rect height={2} rx={1} width={12} x={6} y={11} />
                                            </svg> </button>
                                        <div className="selected-number">
                                            <p id="kidRsvpCount" data-ng-bind="eventUser.rsvpKidCount" className="ng-binding">0</p>
                                        </div>
                                        <button className="plus" id="rsvpKidPlus" data-ng-click="rsvpKidPlus()">
                                            <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{ height: '22px', width: '22px', display: 'block', fill: 'currentcolor' }}>
                                                <rect height={2} rx={1} width={12} x={6} y={11} />
                                                <rect height={12} rx={1} width={2} x={11} y={6} />
                                            </svg> </button>
                                    </div>
                                </div>
                                <div className="form-group inline-form-group">
                                    <label htmlFor="rsvpAcceptingName">Name</label>
                                    <input data-ng-model="eventUser.name" name="rsvpAcceptingName" placeholder="Name" required id="rsvpAcceptingName" type="text" className="ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required" />
                                </div>
                                <div className="form-group inline-form-group">
                                    <label htmlFor="rsvpAcceptingEmail">Email</label>
                                    <input placeholder="Email" required data-ng-model="eventUser.emailAddress" name="rsvpAcceptingEmail" id="rsvpAcceptingEmail" type="email" className="ng-pristine ng-untouched ng-empty ng-valid-email ng-invalid ng-invalid-required" />
                                </div>
                                <div className="form-group inline-form-group">
                                    <label htmlFor="rsvpAcceptingPhone">Phone</label>
                                    <input placeholder="Phone" required data-ng-model="eventUser.phoneNumber" name="rsvpAcceptingPhone" id="rsvpAcceptingPhone" type="tel" className="ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required" />
                                </div>
                                <div className="form-group inline-form-group rsvp-chooser">
                                    <div className="text-checkbox-container">
                                        <input type="radio" name="rsvp-status" data-ng-model="eventUser.rsvpStatus" required defaultValue="A" className="ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required" />
                                        <span className="option rounded-pill">Accept</span>
                                    </div>
                                    <div className="text-checkbox-container">
                                        <input type="radio" name="rsvp-status" data-ng-model="eventUser.rsvpStatus" defaultValue="D" className="ng-pristine ng-untouched ng-valid ng-empty" />
                                        <span className="option rounded-pill">Decline</span>
                                    </div>
                                    <div className="text-checkbox-container">
                                        <input type="radio" name="rsvp-status" data-ng-model="eventUser.rsvpStatus" defaultValue="T" className="ng-pristine ng-untouched ng-valid ng-empty" />
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
                                        {/* ngRepeat: contact in event.contacts */}<li className="list-group-item contact-info participant ng-scope" data-ng-repeat="contact in event.contacts"><img className="img-fluid img-circle" data-ng-src="/images/user.png" alt="vasantha" src="/images/user.png" />
                                            <div className="contact-details">
                                                <p className="name"><span data-ng-hide="contact.firstName === null" data-ng-bind="(contact.firstName) + &quot; &quot;" className="ng-binding">vasantha </span><span data-ng-hide="contact.lastName === null" data-ng-bind="contact.lastName" className="ng-binding">Dacha</span></p>
                                                <div className="number">
                                                    <a data-ng-hide="contact.phoneNumber === null" data-ng-bind="contact.phoneNumber" href="tel:3609917711" className="ng-binding">3609917711</a>
                                                </div>
                                                <div className="email">
                                                    <a data-ng-hide="contact.emailAddress === null" data-ng-bind="contact.emailAddress" href="mailto:admin@funzippy.com" className="ng-binding">admin@funzippy.com</a>
                                                </div>
                                            </div> </li>{/* end ngRepeat: contact in event.contacts */}<li className="list-group-item contact-info participant ng-scope" data-ng-repeat="contact in event.contacts"><img className="img-fluid img-circle" data-ng-src="/images/user.png" alt="REVHI" src="/images/user.png" />
                                            <div className="contact-details">
                                                <p className="name"><span data-ng-hide="contact.firstName === null" data-ng-bind="(contact.firstName) + &quot; &quot;" className="ng-binding">REVHI </span><span data-ng-hide="contact.lastName === null" data-ng-bind="contact.lastName" className="ng-binding">hijk</span></p>
                                                <div className="number">
                                                    <a data-ng-hide="contact.phoneNumber === null" data-ng-bind="contact.phoneNumber" href="tel:3585644782" className="ng-binding">3585644782</a>
                                                </div>
                                                <div className="email">
                                                    <a data-ng-hide="contact.emailAddress === null" data-ng-bind="contact.emailAddress" href="mailto:vfx@gmail.com" className="ng-binding">vfx@gmail.com</a>
                                                </div>
                                            </div> </li>{/* end ngRepeat: contact in event.contacts */}
                                    </ul>
                                </div>
                                <span className="dashed-decoration-dark" />
                            </div>{/* end ngIf: event.contacts !== null */}
                            <div className="sidebar-section hidden-initially" id="sponsorsDiv" style={{ display: 'none' }}>
                                <h4>SPONSORSHIP</h4>
                                <p>This event is looking for sponsors</p>
                                <button className="btn btn-action" data-toggle="modal" data-target="#sponsorModal" data-backdrop="static">See Sponsorship Packages</button>
                                <span className="dashed-decoration-dark" />
                            </div>
                            <div className="sidebar-section hidden-initially" id="boothsDiv" style={{ display: 'none' }}>
                                <h4>BOOTH SPACE</h4>
                                <p>Buy a booth today</p>
                                <button className="btn btn-action" data-toggle="modal" data-target="#boothModal" data-backdrop="static">See Booths</button>
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
                    <div className="row gift-registry hidden-initially ng-hide" id="giftItemsDetails" ng-show="event.giftItems" style={{ display: 'none' }}>
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
                                                    <input type="checkbox" name="volunteerItem" />
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
                    <div className="row hidden-initially ng-hide" id="picturesGallery" ng-show="event.media" style={{ display: 'none' }}>
                        <div className="gallery">
                            <div className="col-sm-12">
                                <div className="carousel slide" id="eventMediaCarousel" data-interval="false" data-ride="false">
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
                    <Table
                                columns={["Start Date", "End Date", "Start TIme", "End Time", "Name", "Email", "Phone"]}
                                data={[[] ]}
                            />
                    <div className="row social-section event-footer-section">
                        <h4>Share event</h4>
                        <div className="col-sm-12 social-icons">
                            <a id="fbshare" href="https://www.facebook.com/sharer.php?u=https://funzippy.com/event/5ef42caf3bbd7f5399c08dd1/hGWIHg3gFpo" aria-label="Facebook"><i className="fab fa-facebook" aria-hidden="true" /></a>
                            <a id="twittershare" href="https://twitter.com/intent/tweet?text=Carnatic%20Music%20Concert%202020&url=https://funzippy.com/event/5ef42caf3bbd7f5399c08dd1/hGWIHg3gFpo" aria-label="Twitter"><i className="fab fa-twitter" aria-hidden="true" /></a>
                        </div>
                    </div>
                   
                    <div className="row search-tags event-footer-section">
                        <h4>Tags</h4>
                        <div className="col-sm-12 tags-container">
                            {/* ngRepeat: searchTag in event.searchTags track by $index */}<div className="search-tag ng-scope" data-ng-repeat="searchTag in event.searchTags track by $index">
                                <p className="ng-binding">Things to do</p>
                            </div>{/* end ngRepeat: searchTag in event.searchTags track by $index */}<div className="search-tag ng-scope" data-ng-repeat="searchTag in event.searchTags track by $index">
                                <p className="ng-binding">Things to do in Dallas/FortWorth</p>
                            </div>{/* end ngRepeat: searchTag in event.searchTags track by $index */}<div className="search-tag ng-scope" data-ng-repeat="searchTag in event.searchTags track by $index">
                                <p className="ng-binding">Events in Dallas/FortWorth</p>
                            </div>{/* end ngRepeat: searchTag in event.searchTags track by $index */}<div className="search-tag ng-scope" data-ng-repeat="searchTag in event.searchTags track by $index">
                                <p className="ng-binding">Things to do in Frisco</p>
                            </div>{/* end ngRepeat: searchTag in event.searchTags track by $index */}<div className="search-tag ng-scope" data-ng-repeat="searchTag in event.searchTags track by $index">
                                <p className="ng-binding">Events in Frisco</p>
                            </div>{/* end ngRepeat: searchTag in event.searchTags track by $index */}<div className="search-tag ng-scope" data-ng-repeat="searchTag in event.searchTags track by $index">
                                <p className="ng-binding">Music Dallas/FortWorth</p>
                            </div>{/* end ngRepeat: searchTag in event.searchTags track by $index */}<div className="search-tag ng-scope" data-ng-repeat="searchTag in event.searchTags track by $index">
                                <p className="ng-binding">Music Frisco</p>
                            </div>{/* end ngRepeat: searchTag in event.searchTags track by $index */}
                        </div>
                    </div>
                    <div className="row single-footer single-event-footer">
                        <div className="col-sm-12">
                            <h3 data-ng-bind="event.name" className="ng-binding">Carnatic Music Concert 2020</h3>
                            <p className="lead ng-binding" data-ng-bind="event.locationName">Lawler Middle School</p>
                            <p data-ng-bind="event.address1" className="ng-binding">12921 Rolater Rd</p>
                            <p data-ng-bind="event.cityStateZip" className="ng-binding">Frisco, TX - 75035</p>
                            <p data-ng-bind="event.startDateTime | date:'EEEE d, MMMM y' : 'UTC'" className="ng-binding">Saturday 27, June 2020</p>
                        </div>
                    </div>
                    {/* ngIf: event.createdBy != '' */}
                </div>
            </div>
        </div>
    )
}