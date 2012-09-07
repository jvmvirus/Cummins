//
//  MyClass.h
//  Cummins
//
//  Created by Minh Luong Van on 8/20/12.
//  Copyright (c) 2012 BKIT. All rights reserved.
//
#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>
#import "Loading.h"

#ifdef CORDOVA_FRAMEWORK
@interface LoadingPlugin : CDVPlugin {
#endif
	NSString *callbackID;
	
}

@property (nonatomic, copy) NSString* callbackID;
@property (nonatomic, retain) Loading* loading;

-(void)print:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)showLoading:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)hideLoading:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end
