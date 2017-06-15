#import "RCTFrameManager.h"
#import "RCTFrame.h"

@implementation RCTFrameManager

RCT_EXPORT_MODULE()

- (UIView *)view {
  return [RCTFrame new];
}

RCT_EXPORT_VIEW_PROPERTY(bundle, NSString)

@end
