//
//  MyClass.m
//  Cummins
//
//  Created by Minh Luong Van on 8/20/12.
//  Copyright (c) 2012 BKIT. All rights reserved.
//

#import "LoadingPlugin.h" 
#ifdef CORDOVA_FRAMEWORK
#import <Cordova/CDVViewController.h>
#else
#import "Cordova/CDVViewController.h"
#endif
          
@implementation LoadingPlugin

@synthesize callbackID, loading;

-(void)print:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options  
{
	   // The first argument in the arguments parameter is the callbackID.
	   // We use this to send data back to the successCallback or failureCallback
	   // through PluginResult
	   self.callbackID = [arguments pop];

	   // Get the string that javascript sent us
	   NSString *stringObtainedFromJavascript = [arguments objectAtIndex:0];                 

	   // Create the Message that we wish to send to javascript
	   NSMutableString *stringToReturn = [NSMutableString stringWithString: @"StringReceived:"];

	   // Append the received string to the string we plan to send out        
	   [stringToReturn appendString: stringObtainedFromJavascript];

	   // Create Plugin Result 
	   CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
			  messageAsString: [stringToReturn stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];

	   // Checking if the string received is HelloWorld or not
	   if ([stringObtainedFromJavascript isEqualToString:@"HelloWorld"] == YES)
	   {
			  // Call the javascript success function
			  [self writeJavascript: [pluginResult toSuccessCallbackString:self.callbackID]];
	   } else
	   {    
			  // Call the javascript error function
			  [self writeJavascript: [pluginResult toErrorCallbackString:self.callbackID]];
	   }
	   
}

-(void)showLoading:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
	self.callbackID = [arguments pop];

	if (loading == NULL) {
		loading = [[Loading alloc] initWithFrame:CGRectMake(0, 0, 320, 480)];
	}
	NSMutableString *stringToReturn = [NSMutableString stringWithString: @"StringReceived:"];

	 CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
		  messageAsString: [stringToReturn stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
	[self writeJavascript: [pluginResult toSuccessCallbackString:self.callbackID]];
	
#ifdef CORDOVA_FRAMEWORK
    CDVViewController* cont = (CDVViewController*)[ super viewController ];
	[cont.view addSubview:loading];
#endif	
}

-(void)hideLoading:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
	 NSMutableString *stringToReturn = [NSMutableString stringWithString: @"StringReceived:"];

	 CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
		  messageAsString: [stringToReturn stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
	[self writeJavascript: [pluginResult toSuccessCallbackString:self.callbackID]];

	[loading removeFromSuperview];
}

- (void) dealloc {
	self.loading = nil;
	[super dealloc];
}
@end