var path = require("path");
var hid = require(path.join(__dirname, "..", "index"));

// These tests assume that a compatible HID device is connected
describe('node-hid.HID', function() {
  var device = null;
  var devices = hid.devices();
  var deviceInfo;
  var len = devices.length;

  var setup = function() {
    device = new hid.HID(deviceInfo.path);
  };

  var tearDown = function() {
    device.write([0x3f, 1, 0x3b]);
    device.close();
  }

  for (var i = 0; i < len; i++) {
    try {
      device = new hid.HID(devices[i].vendorId, devices[i].productId);
    } catch(e) {
      continue;
    }
    
    if (device != null) {
      deviceInfo = devices[i];
      tearDown();
      break;
    }
  }

  if (device == null) {
    throw new Error("No compatible devices found");
  }

  describe("constructor", function() {
    it("throws an exception if it cannot open", function(done) {
      var openWithEmptyString = function() {
        var thisWillNotWork = new hid.HID("");
      };

      expect(openWithEmptyString).toThrow();
      done();
    });

    it("Opens a device by path", function(done) {
      device = new hid.HID(deviceInfo.path);
      expect(device.write).toBeDefined();
      tearDown();
      done();
    });

    it("Opens a device by vendor and product ID", function(done) {
      device = new hid.HID(deviceInfo.vendorId, deviceInfo.productId);
      expect(device.write).toBeDefined();
      tearDown();
      done();
    });
  });
});
