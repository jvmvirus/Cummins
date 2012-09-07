//
//  Loading.m
//  Cummins
//
//  Created by Minh Luong Van on 8/20/12.
//  Copyright (c) 2012 BKIT. All rights reserved.
//

#import "Loading.h"
#import "QuartzCore/QuartzCore.h"

@implementation Loading

@synthesize loadingAIV, backgroundLoading, loadingTitle;

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        // Initialization code
		//[[NSBundle mainBundle] loadNibNamed:@"Loading" owner:self options:nil];
		//[self addSubview:self.view];
		
		self.backgroundColor = [[UIColor blackColor] colorWithAlphaComponent:0.25];
		
		
		backgroundLoading = [[UIView alloc] initWithFrame:CGRectMake(80, 150, 160, 180)];
		backgroundLoading.backgroundColor = [[UIColor blackColor] colorWithAlphaComponent:0.3];
		backgroundLoading.layer.cornerRadius = 8;
		
		loadingAIV = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhiteLarge];
		
		loadingAIV.frame = CGRectMake(142, 221, loadingAIV.frame.size.width, loadingAIV.frame.size.height);
		loadingAIV.hidden = NO;
		[loadingAIV startAnimating];
		
		loadingTitle = [[UILabel alloc] initWithFrame:CGRectMake(123, 295, 100, 30)];
		loadingTitle.backgroundColor = [UIColor clearColor];
		loadingTitle.font = [UIFont boldSystemFontOfSize:18];
		loadingTitle.textColor = [UIColor whiteColor];
		loadingTitle.text = @"Loading...";
		
		[self addSubview:backgroundLoading];
		[self addSubview:loadingAIV];
		[self addSubview:loadingTitle];
    }
    return self;
}

- (void) awakeFromNib {
	[super awakeFromNib];
	
	//[[NSBundle mainBundle] loadNibNamed:@"Loading" owner:self options:nil];
	//[self addSubview:self.view];
}

- (void) dealloc {
	[loadingAIV release];
	[backgroundLoading release];
	[loadingTitle release];
	[super dealloc];
}

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect
{
    // Drawing code
}
*/

@end
