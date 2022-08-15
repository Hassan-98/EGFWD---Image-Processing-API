import { resizer } from '../../utils/resizer.util';
import fs from 'fs';

describe('Test Resizer Function', () => {
  it('Check processing images', async () => {
    const result = await resizer({
      filename: 'fjord.jpg',
      width: 0,
      height: 0,
    });

    expect(result).toEqual('assets/thumb/fjord.jpg');
    expect(fs.existsSync(`assets/thumb/fjord.jpg`)).toEqual(true);

    fs.unlinkSync(`assets/thumb/fjord.jpg`);
  });

  it('Check resizing images', async () => {
    const result = await resizer({
      filename: 'fjord.jpg',
      width: 400,
      height: 400,
    });

    expect(result).toEqual('assets/thumb/fjord_400x400.jpg');
    expect(fs.existsSync(`assets/thumb/fjord_400x400.jpg`)).toEqual(true);

    fs.unlinkSync(`assets/thumb/fjord_400x400.jpg`);
  });
});
