var path = require("path");
var hid = require(path.join(__dirname, "..", "index"));

describe('node-hid.devices', function() {
  it("returns a list", function(done) {
    expect(hid.devices() instanceof Array).toBe(true);
    done();
  });

  it("returns deviceInfo objects", function() {
    var devices = hid.devices();
    expect(devices.length).toBeGreaterThan(0);
    var deviceInfo = devices[0];
    var deviceKeys = Object.keys(deviceInfo);
    expect(deviceKeys).toContain("productId");
    expect(deviceKeys).toContain("vendorId");
    expect(deviceKeys).toContain("serialNumber");
    expect(deviceKeys).toContain("interface");
    expect(deviceKeys).toContain("usagePage");
    expect(deviceKeys).toContain("usage");
    expect(deviceKeys).toContain("path");
  });
});
