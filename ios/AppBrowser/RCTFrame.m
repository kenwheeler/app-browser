#import "RCTFrame.h"
#import <React/RCTUtils.h>
#import <React/RCTBridge.h>
#import <React/RCTUtils.h>
#import <React/RCTUIManager.h>
#import <React/UIView+React.h>
#import <React/RCTBundleURLProvider.h>

@implementation RCTFrame
{
  RCTRootView *_rootView;
  NSString *_bundle;
}

- (void)setBundle:(NSString *)bundle {
  _bundle = bundle;
  [self createViewIfCan];
}

- (void)createViewIfCan {
  if (!_bundle) {
    return;
  }
  
  if (_rootView) {
    [_rootView removeFromSuperview];
    _rootView = nil;
  }
  
  _rootView = [[RCTRootView alloc] initWithBundleURL:[NSURL URLWithString:_bundle]
                                                      moduleName:@"ExampleApp"
                                               initialProperties:nil
                                                   launchOptions:nil];
  [self addSubview:_rootView];
  CGRect screenBounds = [[UIScreen mainScreen] bounds];
  self.frame = CGRectMake(0, 0, screenBounds.size.width, screenBounds.size.height - 55);
  [_rootView setFrame:self.bounds];
  
}

@end
