import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

// Parse
import { Parse } from 'parse';

// Constants
import { ENV } from '../../app/app.constant';

@Injectable()
export class ParseProvider {
  private parseAppId: string = ENV.parseAppId;
  private parseServerUrl: string = ENV.parseServerUrl;
  private parseJavascriptKey: string = ENV.parseJavascriptKey;

  constructor() {
    this.parseInitialize();
    console.log('Initiated Parse');
  }

  //This is Retrieving Survey Results from Parse Server
  public basicQuery(offset: number = 0, limit: number = 3, parseObject: string, parseColumn: string, parseParam: string): Promise<any> {
    //Returns the resolve (the query) and if there's an error, rejects
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Creates local object based on "SurveyData" Object in Parse-Server
        const SurveyData = Parse.Object.extend(parseObject);

        //Queries the SurveyData class from Parse Server
        let query = new Parse.Query(SurveyData);
        
        //You can skip the first results by setting skip
        query.skip(offset);

        //You can limit the number of results by setting "limit"
        query.limit(limit);

        //Limiting Results based on a class
        query.equalTo(parseColumn,parseParam);

        //Below searches what's in the surveyPoints array
        query.find().then((surveyPoints) => {
          resolve(surveyPoints);
        }, (error) => {
          reject(error);
        });
      }, 500);
    });
  }

  //This is Retrieving Survey Results from Parse Server
  public geoQuery(lat: number, long: number, limit: number , parseClass: string, parseColumn: string, parseParam: string): Promise<any> {
    //Returns the resolve (the query) and if there's an error, rejects
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Creates local object based on "SurveyData" Object in Parse-Server
        const SurveyData = Parse.Object.extend(parseClass);

        //Users Location by creaing geopoint
        var myLocation = new Parse.GeoPoint({latitude: lat, longitude: long});

        //Query
        //Queries the Class from Parse Server
        let query = new Parse.Query(SurveyData);
        
        // Interested in locations (GeoPoint Column in Parse) near user.
        //query.near("location", myLocation);
        query.withinMiles("location", myLocation, 5);

        //You can limit the number of results by setting "limit"
        query.limit(limit);

        //Limiting Results based on a specific paramater in a specific field/column
        query.equalTo(parseColumn, parseParam);

        //Below searches what's in the surveyPoints array
        query.find().then((results) => {
          resolve(results);
        }, (error) => {
          reject(error);
        });
      }, 500);
    });
  }

  //Sets up a New Survey
  //Creates and or Updates Parse Class
  public addSurveyResults(newSurvey): Promise<any> {
    //newSurvey's an object
    const SurveyData = Parse.Object.extend('SurveyData');
    let surveyPoint = new SurveyData();

    for (var key in newSurvey) {
      var obj = newSurvey[key];
      surveyPoint.set(String(key),obj);
    }

    /*
    surveyPoint.set('fname', newSurvey.fname);
    surveyPoint.set('lname' , newSurvey.lname);
    surveyPoint.set('dob' , newSurvey.dob);
    surveyPoint.set('sex' , newSurvey.sex);
    surveyPoint.set('marriageStatus' , newSurvey.marriageStatus);
    surveyPoint.set('numberofIndividualsLivingintheHouse' , newSurvey.numberofIndividualsLivingintheHouse);
    surveyPoint.set('numberofChildrenLivingintheHouse' , newSurvey.numberofChildrenLivingintheHouse);
    surveyPoint.set('numberofChildrenLivinginHouseUndertheAgeof5' , newSurvey.numberofChildrenLivinginHouseUndertheAgeof5);
    surveyPoint.set('occupation' , newSurvey.occupation);
    surveyPoint.set('educationLevel' , newSurvey.educationLevel);
    surveyPoint.set('telephoneNumber' , newSurvey.telephoneNumber);
    surveyPoint.set('communityName' , newSurvey.communityname);
    surveyPoint.set('yearsLivedinthecommunity' , newSurvey.yearsLivedinthecommunity);
    surveyPoint.set('memberofthefollowingorganizations' , newSurvey.memberofthefollowingorganizations);
    surveyPoint.set('typeofHealthinsuranceDoyouHave' , newSurvey.typeofHealthinsuranceDoyouHave);
    surveyPoint.set('frequencyofYourMedicalVisits' , newSurvey.frequencyofYourMedicalVisits);
    surveyPoint.set('familyhistory' , newSurvey.familyhistory);
    surveyPoint.set('diagnosisfromadoctor' , newSurvey.diagnosisfromadoctor);
    surveyPoint.set('sexuallytransmitteddiseasesinyourcommunity' , newSurvey.sexuallytransmitteddiseasesinyourcommunity);
    surveyPoint.set('teenagePregnancyprevalentinyourcommunity' , newSurvey.teenagePregnancyprevalentinyourcommunity);
    surveyPoint.set('waterAccess' , newSurvey.waterAccess);
    surveyPoint.set('typeofWaterdoyoudrink' , newSurvey.typeofWaterdoyoudrink);
    surveyPoint.set('clinicAccess' , newSurvey.clinicAccess);
    surveyPoint.set('qualityClinicService' , newSurvey.qualityClinicService);
    surveyPoint.set('latrineAccess' , newSurvey.latrineAccess);
    surveyPoint.set('conditionoFloorinyourhouse' , newSurvey.conditionoFloorinyourhouse);
    surveyPoint.set('conditionoRoofinyourhouse' , newSurvey.conditionoRoofinyourhouse);
    surveyPoint.set('availableTrashManagementandDisposalServices' , newSurvey.availableTrashManagementandDisposalServices);
    surveyPoint.set('trashDisposalLocation' , newSurvey.trashDisposalLocation);
    surveyPoint.set('immediateCare' , newSurvey.immediateCare);
    surveyPoint.set('biggestProblemintheimmediatecommunity' , newSurvey.biggestProblemintheimmediatecommunity);
    surveyPoint.set('biggestProblemintheregion' , newSurvey.biggestProblemintheregion);
    surveyPoint.set('howCanweaddressandimprovethesituation' , newSurvey.howCanweaddressandimprovethesituation);
    surveyPoint.set('otherOrganizationsYouKnow' , newSurvey.otherOrganizationsYouKnow);
    surveyPoint.set('dayMostConvenient' , newSurvey.dayMostConvenient);
    surveyPoint.set('hourMostConvenient' , newSurvey.hourMostConvenient);
    */
    //var point = new Parse.GeoPoint(30.0, -20.0);
    var point = new Parse.GeoPoint(newSurvey.latitude,newSurvey.longitude);
    //surveyPoint.set('latitude' , newSurvey.latitude);
    //surveyPoint.set('longitude' , newSurvey.longitude);
    surveyPoint.set('location', point);
 
    //surveyPoint.set('surveyingUser', newSurvey.surveyingUser);
    //surveyPoint.set('surveyingOrganization', newSurvey.surveyingOrganization);

    return surveyPoint.save(null, {
      success: function (surveyPoint) {
        console.log(surveyPoint);
        return surveyPoint;
      },
      error: function (surveyPoint, error) {
        console.log(error);
        return error;
      }
    });
  }
  
  //Sets up a New Assets
  //Creates and or Updates Parse Class
  public addAssetsResults(newAssets): Promise<any> {
    const AssetData = Parse.Object.extend('AssetData');

    let assetPoint = new AssetData();
    assetPoint.set('physicalName', newAssets.physicalName);
    assetPoint.set('physicalName', newAssets.humanName);
    
    assetPoint.set('physicalAsset', newAssets.physicalAsset);
    assetPoint.set('humanAsset', newAssets.humanAsset);

    //Latitude and longitude
    var point = new Parse.GeoPoint(newAssets.latitude,newAssets.longitude);
    assetPoint.set('latitude', newAssets.latitude);
    assetPoint.set('longitude', newAssets.longitude);
    assetPoint.set('location', point);

    //Enterprise Information
    assetPoint.set('surveyingUser', newAssets.surveyingUser);
    assetPoint.set('surveyingOrganization', newAssets.surveyingOrganization);

    return assetPoint.save(null, {
      success: function (assetPoint) {
        console.log(assetPoint);
        return assetPoint;
      },
      error: function (assetPoint, error) {
        console.log(error);
        return error;
      }
    });
  }

  //Initialize Parse Server
  private parseInitialize() {
    //Back4app
    Parse.initialize(this.parseAppId,this.parseJavascriptKey);
    
    //Heroku
    //Parse.initialize(this.parseAppId);
    
    //Server
    Parse.serverURL = this.parseServerUrl;
  }



}
