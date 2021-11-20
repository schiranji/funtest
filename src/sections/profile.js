import React from "react"
import { Table } from "baseui/table-semantic";

export const Profile = (props) => {
    return (
        
        <div className="profile-page">
            <div className="container profile-detail">
                <div className="row justify-content-center">
                    <div className="col-sm-8 profile">
                        <div className="row single-header">
                            <div className="col-sm-12">
                                <h1>Your Profile</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group form-group-inline">
                                            <label htmlFor="firstName">First Name</label>
                                            <input id="firstName" placeholder="First Name" type="text" ng-model="user.firstName" className="ng-pristine ng-untouched ng-valid ng-not-empty" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group form-group-inline">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input id="lastName" placeholder="Last Name" type="text" ng-model="user.lastName" className="ng-pristine ng-untouched ng-valid ng-not-empty" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group form-group-inline">
                                            <label htmlFor="nickName">Nick Name</label>
                                            <input id="firstName" placeholder="First Name" type="text" ng-model="user.firstName" className="ng-pristine ng-untouched ng-valid ng-not-empty" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group form-group-inline">
                                            <label htmlFor="phoneNumber">Phone Number</label>
                                            <input id="phoneNumber" placeholder="Phone Number" type="text" ng-model="user.phoneNumber" className="ng-pristine ng-untouched ng-valid ng-not-empty" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group form-group-inline">
                                            <label htmlFor="emailAddress">Email Address</label>
                                            <input id="emailAddress" placeholder="Email" type="email" ng-model="user.emailAddress" className="ng-pristine ng-untouched ng-valid ng-valid-email ng-not-empty" />
                                        </div>
                                    </div>
                                   
                                </div>
                                <hr />
                                <div className="form-group form-group-inline">
                                    <label htmlFor="address1">Address1</label>
                                    <input id="address1" placeholder="Address" type="text" ng-model="user.address1" className="ng-pristine ng-untouched ng-valid ng-empty" />
                                </div>
                                <div className="form-group form-group-inline">
                                    <label htmlFor="address2">Address2</label>
                                    <input id="address1" placeholder="Address" type="text" ng-model="user.address1" className="ng-pristine ng-untouched ng-valid ng-empty" />
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group form-group-inline">
                                            <label htmlFor="city">City</label>
                                            <input id="city" placeholder="City" type="text" ng-model="user.city" className="ng-pristine ng-untouched ng-valid ng-empty" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group form-group-inline ng-pristine ng-untouched ng-valid ng-empty" ng-model="user.state">
                                            <label htmlFor="state">State</label>
                                            <select id="state">
                                                <option selected value="Choose...">Choose...</option>
                                                <option value="AL">Alabama</option>
                                                <option value="AK">Alaska</option>
                                                <option value="AZ">Arizona</option>
                                                <option value="AR">Arkansas</option>
                                                <option value="CA">California</option>
                                                <option value="CO">Colorado</option>
                                                <option value="CT">Connecticut</option>
                                                <option value="DE">Delaware</option>
                                                <option value="DC">District Of Columbia</option>
                                                <option value="FL">Florida</option>
                                                <option value="GA">Georgia</option>
                                                <option value="HI">Hawaii</option>
                                                <option value="ID">Idaho</option>
                                                <option value="IL">Illinois</option>
                                                <option value="IN">Indiana</option>
                                                <option value="IA">Iowa</option>
                                                <option value="KS">Kansas</option>
                                                <option value="KY">Kentucky</option>
                                                <option value="LA">Louisiana</option>
                                                <option value="ME">Maine</option>
                                                <option value="MD">Maryland</option>
                                                <option value="MA">Massachusetts</option>
                                                <option value="MI">Michigan</option>
                                                <option value="MN">Minnesota</option>
                                                <option value="MS">Mississippi</option>
                                                <option value="MO">Missouri</option>
                                                <option value="MT">Montana</option>
                                                <option value="NE">Nebraska</option>
                                                <option value="NV">Nevada</option>
                                                <option value="NH">New Hampshire</option>
                                                <option value="NJ">New Jersey</option>
                                                <option value="NM">New Mexico</option>
                                                <option value="NY">New York</option>
                                                <option value="NC">North Carolina</option>
                                                <option value="ND">North Dakota</option>
                                                <option value="OH">Ohio</option>
                                                <option value="OK">Oklahoma</option>
                                                <option value="OR">Oregon</option>
                                                <option value="PA">Pennsylvania</option>
                                                <option value="RI">Rhode Island</option>
                                                <option value="SC">South Carolina</option>
                                                <option value="SD">South Dakota</option>
                                                <option value="TN">Tennessee</option>
                                                <option value="TX">Texas</option>
                                                <option value="UT">Utah</option>
                                                <option value="VT">Vermont</option>
                                                <option value="VA">Virginia</option>
                                                <option value="WA">Washington</option>
                                                <option value="WV">West Virginia</option>
                                                <option value="WI">Wisconsin</option>
                                                <option value="WY">Wyoming</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group form-group-inline">
                                            <label htmlFor="zipCode">Zip Code</label>
                                            <input id="zipCode" placeholder="Zip Code" type="text" ng-model="user.postalCode" className="ng-pristine ng-untouched ng-valid ng-empty" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group form-group-inline">
                                            <label htmlFor="country">Country</label>
                                            <input id="zipCode" placeholder="Country" type="text" ng-model="user.country" className="ng-pristine ng-untouched ng-valid ng-empty" />
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <button className="btn btn-action mx-0 mt-3" type="submit">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
