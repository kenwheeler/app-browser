#import "RCTFrameManager.h"

#import <React/RCTBridge.h>
#import <React/RCTUtils.h>
#import <React/RCTUIManager.h>
#import <React/UIView+React.h>
#import <React/RCTBundleURLProvider.h>

#import <WebKit/WebKit.h>

@implementation RCTFrameManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  
  UIView *container = [[UIView alloc] init];
  return container;
}

RCT_CUSTOM_VIEW_PROPERTY(bundle, NSString, UIView)
{
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:[NSURL URLWithString:json]
                                                      moduleName:@"ExampleApp"
                                               initialProperties:nil
                                                   launchOptions:nil];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  rootView.autoresizingMask = UIViewAutoresizingFlexibleTopMargin | UIViewAutoresizingFlexibleRightMargin |
  UIViewAutoresizingFlexibleLeftMargin |
  UIViewAutoresizingFlexibleBottomMargin;
  [view addSubview:rootView];
}

@end
