import type { ElementType } from 'react';
import { langAttr, otherLang, useLang, type L } from '../lib/i18n';

type Props = {
  text: L;
  as?: ElementType;
  className?: string;
  /** Classes for the small line in the other language. */
  subClassName?: string;
  /** Put the other-language line under the main one instead of above. */
  subBelow?: boolean;
};

/**
 * A heading. On the Hindi site it carries a small English line as well, the
 * way Bihar's shop boards are painted; the English site stays English.
 */
export default function Duo({ text, as: Tag = 'h2', className, subClassName = 'kicker', subBelow }: Props) {
  const { lang } = useLang();
  const other = otherLang(lang);
  if (lang === 'en') {
    return (
      <Tag className={className}>
        <span className="block">{text.en}</span>
      </Tag>
    );
  }
  const sub = (
    <span lang={langAttr(other)} className={`block ${subClassName}`}>
      {text[other]}
    </span>
  );
  return (
    <Tag className={className}>
      {!subBelow && sub}
      <span lang={langAttr(lang)} className="block">
        {text[lang]}
      </span>
      {subBelow && sub}
    </Tag>
  );
}
